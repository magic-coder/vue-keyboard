let config = require("../config/index");
let recursive = require("recursive-readdir");
let OSS = require('ali-oss');
let path = require('path');
var chalk = require('chalk')
var _ = require('lodash')

let client = new OSS({
  region: 'oss-cn-shanghai-finance-1-pub',
  accessKeyId: 'LTAIyBz4aDjQBElJ',
  accessKeySecret: '0HxkkLug9Wy16sKMzu3hWJMwMqVuKE',
  bucket: 'staticchexian'
});

async function readOssDir(dir){
  let ossFiles = []
  async function listDir(dir) {
    let result = await client.list({
      prefix: dir,
      delimiter: '/'
    });
    
    if(result.objects){
      ossFiles = ossFiles.concat(result.objects.map( f => f.name))
    }
  
    if(result.prefixes) {
      await Promise.all(
        result.prefixes.map( async dir => {
          return await listDir(dir)
        })
      )
    }
    return result
  }

  // 获取oss文件列表
  await listDir(dir)
  return ossFiles
}

async function deploy(){

  try {
    let rootDir = `/${config.projectName}`
    let assetsPath = path.resolve('./deploy/')
    let ossFiles = await readOssDir(rootDir)
    let files = await recursive(assetsPath)

    let localFiles = files.map(file =>  path.relative(assetsPath, file))
    let deleteFiles = _.difference(ossFiles, localFiles)
    let uploadFiles = _.difference(localFiles, ossFiles)

    let uploadFilesCount = 0
    uploadFiles.forEach(async toFile => {
      let file = path.resolve('./deploy/' + toFile)

      let results = await client.put(rootDir +  '/' + toFile, file)
      uploadFilesCount ++ 
      
      console.log(chalk.cyan(`正在部署: `) + chalk.cyan(rootDir +  '/' + toFile))

      if(uploadFilesCount === uploadFiles.length) {
        console.log(chalk.green(`部署成功，共${uploadFiles.length}个文件`))
      }
    })

    // deleteFiles.forEach( async file => {
    //   await client.delete(file)
    //   console.log(chalk.red(`正在删除: `) + chalk.red(file))
    // })
  } catch (e) {
    console.log(chalk.yellow(e.message));
  }
}

deploy()