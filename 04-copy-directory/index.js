const path = require('path');
const fs = require('fs');

const findFolder = path.join(__dirname, 'files');
const createFolder = path.join(__dirname, 'files-copy');

fs.readdir(createFolder, (err, filesCopy) => {
  if (err) {
    throw err;
  }
  filesCopy.forEach( filesCopy => {
    fs.unlink(createFolder + '/' + filesCopy, (err) => {
      if (err) {
        throw err;
      }
    })
  })
})

fs.mkdir(createFolder, { recursive: true }, (err) => {
  if(err) throw err;
});

fs.readdir(findFolder, (err, files) => {
  if (err) {
    throw err;
  }
  files.forEach( files => {
    fs.copyFile(findFolder + '/' + files, createFolder + '/' + files, (err) => {
      if (err) {
        throw err;
      }
    });
  })
  console.log(`Files copied successfully`)
});


