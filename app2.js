const os = require('os');
const fs = require('fs');
var constants = require('./constants');

const fileName = constants.OCR_FILE_NAME;
let data;

/** fs */
//async no error
fs.readdir('./', function(err, files){
  if (err){
    console.log('Error no files', err);
  } else {
    data = files.indexOf(fileName) > -1 ? fs.readFileSync(fileName, 'utf8') : '';
    console.log('Result', files);
    // console.log(`${fileName} contains:\n${data}`);
    getCharacter(0);
  }
});

function getCharacter(index) {
  

  currentCharacter = 0;
  let numberOfRows = 0; // in characters
  let currentRow = 0; //rows through all documents
  let currentLine = 0;


  let chunks = [];
  

  [...data].forEach((char, index) => {
    if (char === '\n' && data[index - 1] !== '\n') {
      currentLine += 1;
      console.log('in1 ', currentLine)
      // if (data[index + 1] === '\n') {
      //   currentLine = 0;
      //   currentRow += 1;
      //   console.log('in2 ', currentRow)
      // }
    }
    if (char === '\n' && data[index - 1] === '\n') {
      numberOfRows += 1;
    }
  });
  const numberOfDigits = (data.length - ((numberOfRows + 1) *2) - (2*(numberOfRows+1))) /9;

  console.log(numberOfRows)
  console.log(numberOfDigits)
  console.log(numberOfDigits)
  console.log(numberOfDigits)
  console.log(numberOfDigits)
  console.log(numberOfDigits)
  console.log(numberOfDigits)
  console.log(numberOfDigits)
  
  dataArray = [...data];
  let char = 0;
  dataArray.forEach( (e, i)=> {

      chunks.push([...dataArray].splice(0, 3));

      dataArray.shift();
      dataArray.shift();
      dataArray.shift();
      dataArray[0]=='\n' ? dataArray.shift() : '';
      if ( dataArray[0]=='\n' ) { 
        dataArray.shift();
        chunks.push('newLine');
      }
    // console.log('1', dataArray);
  })
  // console.log('2', chunks);


// let i=0;
  // while(i < data.length) {
  //   console.log(data[i])
  //   if (data[i] === '\n') {
  //     i++;
  //     // chunks.push([...data].splice(i, i + 3));
  //   } else {
  //     // i++;
  //     chunks.push([...data].splice(i, i + 3));
  //   }
  //   i+=3;
  //   console.log(chunks);
  // }



  // [...data].forEach((char, index) => {
  //   if (char === '\n' && data[index - 1] !== '\n') {
  //     currentLine += 1;
  //     console.log('in1 ', currentLine)
  //     // if (data[index + 1] === '\n') {
  //     //   currentLine = 0;
  //     //   currentRow += 1;
  //     //   console.log('in2 ', currentRow)
  //     // }
  //   }
  //   if (char === '\n' && data[index - 1] === '\n') {
  //     numberOfRows += 1;
  //   }
  // });

  // let i = 0;
  // while (i < data.length) {
  //   if (data.length[i] !== '\n') {
  //     // currentLine += 1;
  //     currentDigit = Math.floor(i/3);
  //     console.log('currentDigit: ', currentDigit);
  //     digits[currentDigit] = i;
  //     console.log('in1 ', currentLine)
  //     // if (data[index + 1] === '\n') {
  //     //   currentLine = 0;
  //     //   currentRow += 1;
  //     //   console.log('in2 ', currentRow)
  //     // }
  //   }
  //   i++;
  // }

  // console.log('numberOfRows: ', numberOfRows)
  // console.log('numberOfRows: ', numberOfRows)
  // console.log('data.length: ', data.length)
  // console.log('data.length: ', data.length)
  // const numberOfDigits = (data.length - ((numberOfRows + 1) *2) - (2*numberOfRows)) /9;
  // console.log(numberOfDigits)
  // console.log(numberOfDigits)
  // console.log(numberOfDigits)
  // console.log(numberOfDigits)




  // for (i=0; i<data.length; i++ ) {

  //   if (data[i] === '_') {
  //     // break;
  //   }
  //   console.log('data: ', data[i]);
  // }
  // current
  // data[]



  // [...data].forEach((char, index) => {

  //   if (char === '\n' && data[index - 1] !== '\n') {
  //     currentLine += 1;
  //     console.log('in1 ', currentLine)
  //     if (data[index + 1] === '\n') {
  //       currentLine = 0;
  //       currentRow += 1;
  //       console.log('in2 ', currentRow)
  //     }
  //   }

  //   if (currentLine === 0) {

  //   }

  // });
}

