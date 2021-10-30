const path = require('path');
const fs = require('fs');

const findFolder = path.join(__dirname, 'files');
const createFolder = path.join(__dirname, 'files-copy');

fs.mkdir(createFolder, { recursive: true }, (err) => {
  if(err) throw err;
});

fs.readdir(createFolder, (err, filesCopy) => {
  if (err) throw err;
  filesCopy.forEach( filesCopyItem => {
    fs.unlink(path.join(__dirname, 'files-copy', filesCopyItem), (err) => {
      if (err) throw err;
    })
  })
})

fs.readdir(findFolder, (err, files) => {
  if (err) throw err;
  files.forEach( filesItem => {
    fs.copyFile(path.join(__dirname, 'files', filesItem), path.join(__dirname, 'files-copy', filesItem), (err) => {
      if (err) throw err;
    });
  })
  console.log(`Files copied successfully`)
});


