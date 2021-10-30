const path = require('path');
const fs = require('fs');

const findFolder = path.join(__dirname, 'secret-folder');

fs.readdir(findFolder, {withFileTypes: true}, (error, file) => {
  if(!error) {
    file.forEach(fileType => {
      if(fileType.isFile()) {
        fs.stat(path.join(__dirname, 'secret-folder', fileType.name), (error, stats) => {
          if(error) {
            console.error(error)
          } else {
            const arrFile = fileType.name.split('.');
            console.log(`${arrFile[0]} - ${arrFile[1]} - ${stats.size*0.001}kb`);
          }
        });
      }
    })
  } else {
    console.error(error)
  }

})


