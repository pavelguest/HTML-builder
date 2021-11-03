const path = require('path');
const fs = require('fs');
const readline = require('readline');
const { stdin, stdout } = process;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputText = fs.createWriteStream(path.join(__dirname, 'text.txt'))

stdout.write(`Please enter any text:\n`);
rl.on('line', (line) => {
  switch (line) {
    case 'exit':
      rl.close();
     }
    inputText.write(`${line}\n`)

    })

rl.on('close', () => {
  console.log(`File create! Good luck!`)
  process.exit(0);
    });



