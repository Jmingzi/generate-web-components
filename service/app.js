const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const { execSync, exec } = require('child_process')
const NodeSsh = require('node-ssh')
const ssh = new NodeSsh()
const request = require('request')

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

function polyfill () {
  // let str = `\nif (!window.Reflect) {\n`
  // str += fs.readFileSync(path.resolve(__dirname, './polyfill/reflect.js'), 'utf8')
  // str += '\n}\n'
  // 判断安卓版本5以下 或者 !window.Reflect 不存在
  let str = `var androidAppVersion = navigator.userAgent.match(/Android ([0-9]+)/i);
var iOSAppVersion = navigator.userAgent.match(/iPhone OS ([0-9]+)/i);
console.log('androidAppVersion', androidAppVersion && androidAppVersion[1], 'iOSAppVersion', iOSAppVersion && iOSAppVersion[1]);
if (
  androidAppVersion && androidAppVersion[1] && androidAppVersion[1] < 5 || 
  iOSAppVersion && iOSAppVersion[1] && iOSAppVersion[1] < 10 || 
  !window.Reflect
) {\n`
  // str = `\nif (!window.Reflect) {\n`
  str += fs.readFileSync(path.resolve(__dirname, './polyfill/core.js'), 'utf8')
  str += '\n}\n'

  str += `if (!window.customElements) {\n`
  str += fs.readFileSync(path.resolve(__dirname, './polyfill/webcomponents-bundle.js'), 'utf8')
  str += '\n}\n'
  return str
}

function generate (state, cb) {
  const componentName = state.components[0].name
  const fileName = `${componentName}.ts`
  const fileNameJs = `${componentName}.js`
  let script = ''

  const content = `(function () {
    if (customElements.get('${componentName}')) {
      console.log('${componentName} 已被定义')
      return
    }
    const state = ${JSON.stringify(state)}
    // @ts-ignore
    defineElem(state.components, state.relationShip, state.propsRelation)
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
      // define.js
      // 添加 polyfill
      // Reflect 和 customElements
      const defineJs = path.resolve(root, 'define.js')
      const defineJsContent = polyfill() + fs.readFileSync(defineJs, 'utf8')
      fs.writeFileSync(defineJs, defineJsContent, 'utf8')
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

async function upload (fileBuffer, filename, category, origin, mToken) {
  return new Promise((resolve, reject) => {
    request.post(
      {
        // url: 'https://filesystem.api.jituancaiyun.com/sfs/webUpload/srvfile?fileType=2&src=cdn',
        url: `${origin}/ygw/external/upload`,
        formData: {
          // upfile: fileBuffer
          file: fileBuffer,
          name: filename,
          src: category
        },
        headers: {
          // Origin: 'https://internal.jituancaiyun.com',
          // Referer: 'https://internal.jituancaiyun.com/fe/upload/index.html'
          Cookie: `mToken=${mToken}`
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

/**
 * 下载文件
 */
app.get('/generate/generate/:name', function (req, res) {
  const fileNameJs = `${req.params.name}.js`
  res.status(200).download(path.resolve(__dirname, './public/', fileNameJs), fileNameJs, function (err) {
    if (!err) {
      // exec(`rm -rf ${filePath}`)
    } else {
      throw err
    }
  })
})

/**
 * 后台仅保存文件
 */
app.post('/generate/savefile', function (req, res) {
  const state = req.body.state
  generate(state, (fileNameJs, filePath) => {
    exec(`rm -rf ${filePath}`)
    res.status(200).send(`保存 ${fileNameJs} 成功`)
  })
})

app.get('/generate/sync', async function (req, res) {
  await ssh.connect({
    host: '10.0.10.86',
    username: 'admin',
    privateKey: path.resolve(__dirname, 'ssh/yangming')
  }).catch(err => {
    res.status(500).send(err.message)
    return Promise.reject(err)
  })
  try {
    // await ssh.putDirectory(path.resolve(__dirname, 'public'), '/home/admin/gitlab/generate-components/')
    await ssh.putFile(path.resolve(__dirname, 'public', 'sign-modal.js'), '/home/admin/gitlab/generate-components/')
    // await ssh.putDirectory(path.resolve(__dirname, 'public'), '/data/webapps/miguvideo.net/aikanvod.miguvideo.net/h5-generate/lib-auto-sync')
    await ssh.execCommand(`git add . && git commit -m "sync public" && git push`, { cwd: '/home/admin/gitlab/generate-components/' })
  } catch (e) {
    res.status(500).send(e.message)
  }

  res.status(200).send('sync success')
})

app.get('/generate/cdn', async function (req, res) {
  // 多个文件
  const { filename, category, origin, mToken } = req.query
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
        buffer = fs.createReadStream(path.resolve(root, `${file}.js`))
        const uploadRes = await upload(buffer, `${file}.js`, category, origin, mToken)
        console.log(JSON.parse(uploadRes))
        fileMap[file] = JSON.parse(uploadRes).value
      } catch (e) {
        console.log(e)
        fileMap[file] = e.message || `${file}.js 不存在`
      }
    }
    res.status(200).send(`window.componentsMap = ${JSON.stringify(fileMap, null, 2)}`)
  }
})

/**
 * 后台从文件导入
 */
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

  let result = content.match(/var state = ([\s\S]+)\/\/ @ts-ignore/)
  if (!result[1]) {
    res.status(500).send('文件格式不对')
  } else {
    result = result[1].trim()
    res.status(200).json(JSON.parse(result.substr(0, result.length - 1)))
  }
})

/**
 * 请求返回单个文件
 */
app.get('/generate/file/:name', async function (req, res) {
  const fileName = req.params.name
  if (!fileName) {
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
  res.sendFile(fileName, options, function (err) {
    if (err) {
      // next(err)
      console.log(err.message)
    } else {
      console.log('Sent:', fileName)
    }
  })
})

/**
 * 删除 define.js
 */
app.get('/generate/del', function (req, res) {
  const root = path.resolve(__dirname, 'public')
  try {
    execSync(`rm -rf ${path.resolve(root, 'define.js')} ${path.resolve(root, 'define.ts')}`)
    res.send(`rm -rf ${path.resolve(root, 'define.js')} ${path.resolve(root, 'define.ts')} 成功`)
  } catch (e) {
    res.send(e.message)
  }
})

app.listen(3003, () => console.log('custom element service listening on port 3003!'))
