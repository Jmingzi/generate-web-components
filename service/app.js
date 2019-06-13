const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const { execSync, exec } = require('child_process')
const NodeSsh = require('node-ssh')
const ssh = new NodeSsh()
const request = require('request')

// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/generate/del', function (req, res) {
  const root = path.resolve(__dirname, 'public')
  try {
    execSync(`rm -rf ${path.resolve(root, 'define.js')} ${path.resolve(root, 'define.ts')}`)
    res.send(`rm -rf ${path.resolve(root, 'define.js')} ${path.resolve(root, 'define.ts')} 成功`)
  } catch (e) {
    res.send(e.message)
  }
})

function generate (state, cb) {
  const fileName = `${state.components[0].name}.ts`
  const fileNameJs = `${state.components[0].name}.js`
  let script = ''

  const content = `(function () {
    const state = ${JSON.stringify(state)}
    // @ts-ignore
    defineElem(state.components, state.relationShip)
  })()`
  const root = path.resolve(__dirname, './public/')
  const filePath = path.resolve(root, fileName)
  fs.writeFileSync(filePath, content, 'utf8')

  const commonPath = path.resolve(root, 'define.ts')
  try {
    fs.readFileSync(commonPath)
    console.log('define.js 存在')
  } catch (e) {
    console.log('define.js 不存在')
    const needCopyFile = [
      'js/item',
      'js/render/style',
      'js/render/util',
      'js/render/dom',
      'js/render/update',
      'js/render/index'
    ]
    needCopyFile.forEach(file => {
      fs.readFileSync(path.resolve(__dirname, `../src/assets/${file}.ts`), 'utf8')
        .replace(/\/\/ substr start for service([\s\S]+?)\/\/ substr end for service/, (a, b) => { script += b })
    })
    // 替换 export
    script = script.replace(/export/g, '')
    // 处理单位
    script = script.replace(/'px'\)/g, '"vw")')
    // 包裹全局
    script = `(function (win) {\n${script.replace('function defineElem', '//@ts-ignore\nwin.defineElem = function')}\n})(window)`
    script = script.replace('function loadComponents', '//@ts-ignore\nwin.loadComponents = function')
    fs.writeFileSync(commonPath, script, 'utf8')
    try {
      execSync(`tsc ${commonPath} --target es5`)
    } catch (e) {
      throw e
    }
  }

  try {
    execSync(`tsc ${filePath} --target es5`)
    cb(fileNameJs, filePath)
  } catch (e) {
    throw e
  }
}

async function upload (fileBuffer) {
  return new Promise((resolve, reject) => {
    request.post(
      {
        url: 'https://filesystem.api.jituancaiyun.com/sfs/webUpload/srvfile?fileType=2&src=cdn',
        formData: {
          // upfile: fs.createReadStream(path.resolve(__dirname, 'public', file))
          upfile: fileBuffer
        },
        headers: {
          Origin: 'https://internal.jituancaiyun.com',
          Referer: 'https://internal.jituancaiyun.com/fe/upload/index.html'
        }
      },
      (err, httpResponse, body) => {
        if (err) {
          reject(err)
        } else {
          resolve(body)
        }
      }
    )
  })
}

app.post('/generate/generate', function (req, res) {
  const state = JSON.parse(req.body.state)
  generate(state, (fileNameJs, filePath) => {
    res.status(200).download(path.resolve(__dirname, './public/', fileNameJs), fileNameJs, function (err) {
      if (!err) {
        // exec(`rm -rf ${filePath} ${path.resolve(root, fileNameJs)}`)
        exec(`rm -rf ${filePath}`)
      } else {
        throw err
      }
    })
  })
})

app.get('/generate/sync', async function (req, res) {
  // const { file, dest } = req.query
  // if (!file) {
  //   res.status(500).send('file 参数必传，例如 file=my-rule,my-site')
  //   return
  // }
  await ssh.connect({
    host: '10.0.10.86',
    username: 'admin',
    privateKey: path.resolve(__dirname, 'ssh/yangming')
  }).catch(err => {
    res.status(500).send(err.message)
    return Promise.reject(err)
  })
  await ssh.putDirectory(path.resolve(__dirname, 'public'), '/home/admin/gitlab/generate-components/')
  await ssh.execCommand(`git add . && git commit -m "sync public" && git push`, { cwd: '/home/admin/gitlab/generate-components/' })

  res.status(200).send('sync success')
})

app.get('/generate/cdn', async function (req, res) {
  // 多个文件
  const filename = req.query.filename
  const root = path.resolve(__dirname, 'public')
  const fileMap = {}
  if (!filename) {
    res.status(500).send('filename 必须传')
  } else {
    const fileArr = filename.split(',')
    for (let i = 0; i < fileArr.length; i++) {
      const file = fileArr[i]
      let buffer
      try {
        buffer = fs.readFileSync(path.resolve(root, `${file}.js`))
      } catch (e) {
        res.status(500).send(`${file}.js 不存在`)
      }
      const uploadRes = await upload(buffer)
      fileMap[file] = JSON.parse(uploadRes).fileUrl.replace('https://statics.jituancaiyun.com', 'https://global.uban360.com')
    }
    res.status(200).send(`window.componentsMap = ${JSON.stringify(fileMap)}`)
  }
})

app.get('/generate/file', async function (req, res) {
  const filename = req.query.filename
  if (!filename) {
    res.status(500).send('filename 必须传')
    return
  }

  const file = path.resolve(__dirname, './public', `${filename}.js`)
  let content
  try {
    content = fs.readFileSync(file, 'utf8')
  } catch (e) {
    const dirs = fs.readdirSync(path.resolve(__dirname, './public'), 'utf8')
      .map(x => /ts$/.test(x) || /define/.test(x) ? undefined : x).filter(Boolean)
    res.status(500).send(`${filename} 不存在，已知列表： ${dirs.join(',')}`)
    return
  }

  let result
  content.replace(/\(function \(\) \{([\s\S]+?)\/\/ @ts-ignore/, (a, b) => {
    result = b.replace('var state = ', '').trim()
  })
  res.status(200).json(JSON.parse(result.substr(0, result.length - 1)))
})

app.get('/generate//file/:name', async function (req, res) {
  const filename = req.query.filename
  if (!filename) {
    res.status(500).send('必须传 file')
    return
  }

  const options = {
    root: path.resolve(__dirname, 'public'),
    dotfiles: 'deny',
    headers: {
      // 'x-timestamp': Date.now(),
      'x-sent': true
    }
  }
  const fileName = req.params.name
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err)
    } else {
      console.log('Sent:', fileName)
    }
  })
})

app.listen(3003, () => console.log('custom element service listening on port 3003!'))
