require('ts-node').register()
const glob = require('glob')
const path = require('path')
const fs = require('fs')

function exportDir(dirpath){
  if(!dirpath || !fs.existsSync(dirpath)){
    throw '目录不存在或者无效'
    return
  }
  let pattern = path.resolve(dirpath,'!(index).ts')
  glob(pattern,(err, files)=>{
    let fileDataArr = []
    files.forEach((el)=>{
      let fileName = path.basename(el,'.ts')
      let moduleName = fileName
      let mod = require(el)
      let keys = Object.keys(mod)
      if(keys.length>0){
        let moduleArr = []
        keys.forEach((key)=>{
          if(key == 'default'){
            moduleArr.push(`default as ${key}`)
          }else{
            moduleArr.push(key)
          }
        })
        moduleName = moduleArr.join(', ')
        fileDataArr.push(`export { ${moduleName} } from './${fileName}'`)
      }else{
        fileDataArr.push(`export { default as ${moduleName} } from './${fileName}'`)
      }
    })
    if(fileDataArr.length>0){
      fs.writeFileSync(path.resolve(dirpath,'index.ts'),fileDataArr.join('\n')+'\n',{encoding:'utf8'})
    }
  })
}
let dirPath = process.argv.pop()
exportDir(dirPath)
