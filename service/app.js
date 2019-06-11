const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const { execSync, exec } = require('child_process')

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

app.post('/generate/generate', function (req, res) {
  const state = JSON.parse(req.body.state)
  const fileName = `${state.components[0].name}.ts`
  const fileNameJs = `${state.components[0].name}.js`
  let script = ''

  const content = `(function () {
    const state = ${req.body.state}
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
    fs.writeFileSync(commonPath, script, 'utf8')
    try {
      execSync(`tsc ${commonPath} --target es5`)
    } catch (e) {
      throw e
    }
  }

  try {
    execSync(`tsc ${filePath} --target es5`)
    res.status(200).download(path.resolve(root, fileNameJs), fileNameJs, function (err) {
      if (!err) {
        exec(`rm -rf ${filePath} ${path.resolve(root, fileNameJs)}`)
      } else {
        throw err
      }
    })
  } catch (e) {
    throw e
  }
})

app.listen(3003, () => console.log('custom element service listening on port 3003!'))
