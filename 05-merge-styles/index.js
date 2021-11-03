const path = require('path');
const fs = require('fs');
const { error } = require('console');

const findFolder = path.join(__dirname, 'styles');
const createBundleCss = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(findFolder, {withFileTypes: true}, (err, files) => {
  if(err) throw err;
  files.forEach((findFiles) => {
    if(findFiles.isFile() && path.extname(findFiles.name) === '.css') {
      const readCss = fs.createReadStream(path.join(__dirname, 'styles', findFiles.name), 'utf-8')
      readCss.on('data', chunk => createBundleCss.write(chunk))
      readCss.on('end', () => console.log(`Styles file ${findFiles.name} add to bundle.css!`))
      readCss.on('error', () => console.log('Error', error.message))
    }
  })
})
