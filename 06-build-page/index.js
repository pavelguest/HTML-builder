const path = require('path');
const fs = require('fs');


const findFolderAssets = path.join(__dirname, 'assets');
const createFolder = path.join(__dirname, 'project-dist');
const createFolderAssets = path.join(__dirname, 'project-dist', 'assets');

fs.mkdir(createFolder, { recursive: true }, (err) => {
  if(err) throw err;
});

fs.mkdir(createFolderAssets, { recursive: true }, (err) => {
    if(err) throw err;
  });


//-------------copy-assets----------//

copy(findFolderAssets, createFolderAssets)
function copy(source, dest) {
  fs.readdir(source, {withFileTypes: true}, (err, files) => {
    if (err) throw err;
    files.forEach(filesItem => {
      const newSource = path.join(source, filesItem.name)
      const newDest = path.join(dest, filesItem.name)
      if (filesItem.isDirectory()) {
        fs.mkdir(newDest, { recursive: true }, (err) => {
          if(err) throw err;
        });
        copy(newSource, newDest)
      } else if (filesItem.isFile()) {
        fs.copyFile(newSource, newDest, (err) => {
          if (err) throw err;
        });
      }
    })
  });
}

//-----------style-----------//

const findFolderCss = path.join(__dirname, 'styles');
const createBundleCss = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

fs.readdir(findFolderCss, {withFileTypes: true}, (err, files) => {
  if(err) throw err;
  files.forEach((findFiles) => {
    if(findFiles.isFile() && path.extname(findFiles.name) === '.css') {
      const readCss = fs.createReadStream(path.join(__dirname, 'styles', findFiles.name), 'utf-8')
      readCss.on('data', chunk => createBundleCss.write(chunk))
      readCss.on('end', () => console.log(`Styles file ${findFiles.name} add to style.css!`))
      readCss.on('error', () => console.log('Error', error.message))
    }
  })
})

//---------------html-----------------//

const templateHtml = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8')
const indexHtml = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'))

templateHtml.on('data', async (chunk) => {
  async function build() {
    let htmlFile = chunk.toString();
    const reg = chunk.match(/{{(.*)}}/gi);
    for (let e of reg) {
      const tagName = e.replace(/\W/g, '');
      const compHtml = await fs.promises.readFile(path.join(__dirname, 'components', `${tagName}.html`), 'utf-8')
      htmlFile = htmlFile.replace(e, compHtml)
    }
    return htmlFile;
  }
  const htmlResult = await build()
  indexHtml.write(htmlResult)
})


