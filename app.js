const os = require('os');
const fs = require('fs');
var constants = require('./constants');

const fileName = constants.OCR_FILE_NAME;
let data;
let chunks = [];
let chunksSplited = [];
let charPerLine = 0;
let charsToNumber = [];
let finalNumber;

/** fs */
// async no error
fs.readdir('./', function(err, files){
  if (err){
    console.log('Error no files', err);
  } else {
    data = files.indexOf(fileName) > -1 ? fs.readFileSync(fileName, 'utf8') : '';
    console.log('Result', files);
    console.log(`${fileName} contains:\n${data}`);
    getCharacter();
    printNumber();
  }
});

function getCharacter() {
  

  currentCharacter = 0;
  let flagRemoveSpace = false;

  dataArray = [...data];
  let tempArray = [];
  dataArray.forEach( (e, index)=> {

    /** remove spaces after pushing any character */
    if(flagRemoveSpace) {
      tempArray.pop();
      flagRemoveSpace = false;
    } 

    /** every 3 characters to bigger array */
    if (tempArray.length === 3) {
      chunks.push(tempArray);
      tempArray = [];
      flagRemoveSpace = true
    }
    if ( e !== '\n') {
      tempArray.push(e);
    }
    if(index===dataArray.length-1){
      chunks.push(tempArray);
    }

    if (e === '\n') {
        chunks.push(e);
      }
  });

  let startingIndex = 0;
  chunks.forEach( (char, index) => {

    if( (char === '\n' && chunks[index-1] === '\n') ) {
      chunksSplited.push(chunks.slice(startingIndex, index-1));
      startingIndex = index+1;
    }
    if ( index === chunks.length-1 ) {
      chunksSplited.push(chunks.slice(startingIndex, index+1));
    }
  })
  
  getCharPerLine ()
}

  function getCharPerLine () {
    chunksSplited.forEach((currentChunk, index) => {
      let i = 0;
      while (currentChunk[i] !== '\n') {
        i++;
      }
      charPerLine = i + 1;

      
      mapChar(currentChunk);

    })
    
  }

  function mapChar(currentChunk) {
    let i=0;
    while (i<charPerLine-1) {
      
      compareAndConvert(currentChunk[i], currentChunk[i+charPerLine], currentChunk[i+charPerLine+charPerLine], charPerLine, i);
      i++;
    }
  }

    function compareAndConvert(firstChar, secondChar, thirdChar, charPerLine, i) {
      let arrayToString;

      /** check to prevent any data errors */
      if ( Array.isArray(firstChar) && Array.isArray(secondChar) && Array.isArray(thirdChar) ) {
              
                arrayToString = firstChar.join()+secondChar.join()+thirdChar.join();
              }

        let zero = constants.NUMBER_IN_OCR.ZERO.upper.join() + constants.NUMBER_IN_OCR.ZERO.mid.join() + constants.NUMBER_IN_OCR.ZERO.lower.join();
        let one = constants.NUMBER_IN_OCR.ONE.upper.join() + constants.NUMBER_IN_OCR.ONE.mid.join() + constants.NUMBER_IN_OCR.ONE.lower.join();
        let two = constants.NUMBER_IN_OCR.TWO.upper.join() + constants.NUMBER_IN_OCR.TWO.mid.join() + constants.NUMBER_IN_OCR.TWO.lower.join();
        let three = constants.NUMBER_IN_OCR.THREE.upper.join() + constants.NUMBER_IN_OCR.THREE.mid.join() + constants.NUMBER_IN_OCR.THREE.lower.join();
        let four = constants.NUMBER_IN_OCR.FOUR.upper.join() + constants.NUMBER_IN_OCR.FOUR.mid.join() + constants.NUMBER_IN_OCR.FOUR.lower.join();
        let five = constants.NUMBER_IN_OCR.FIVE.upper.join() + constants.NUMBER_IN_OCR.FIVE.mid.join() + constants.NUMBER_IN_OCR.FIVE.lower.join();
        let six = constants.NUMBER_IN_OCR.SIX.upper.join() + constants.NUMBER_IN_OCR.SIX.mid.join() + constants.NUMBER_IN_OCR.SIX.lower.join();
        let seven = constants.NUMBER_IN_OCR.SEVEN.upper.join() + constants.NUMBER_IN_OCR.SEVEN.mid.join() + constants.NUMBER_IN_OCR.SEVEN.lower.join();
        let eight = constants.NUMBER_IN_OCR.EIGHT.upper.join() + constants.NUMBER_IN_OCR.EIGHT.mid.join() + constants.NUMBER_IN_OCR.EIGHT.lower.join();
        let nine = constants.NUMBER_IN_OCR.NINE.upper.join() + constants.NUMBER_IN_OCR.NINE.mid.join() + constants.NUMBER_IN_OCR.NINE.lower.join();
      
        let currentNumber;

      switch (arrayToString) {

        case zero: 
        currentNumber = 0;
        break;

        case one: 
        currentNumber = 1;
        break;

        case two: 
        currentNumber = 2;
        break;

        case three: 
        currentNumber = 3;
        break;

        case four: 
        currentNumber = 4;
        break;

        case five: 
        currentNumber = 5;
        break;

        case six: 
        currentNumber = 6;
        break;

        case seven: 
        currentNumber = 7;
        break;

        case eight: 
        currentNumber = 8;
        break;

        case nine: 
        currentNumber = 9;
        break;

        default: currentNumber = ' errorInData ';
        
      }

      const addNewLine = (charPerLine-2 === i) ? '\n' : '';
     
      charsToNumber.push(currentNumber+addNewLine);
  }

  function printNumber() {
    finalNumber = charsToNumber.join();
    /** regex to remove commas */
    finalNumber = finalNumber.replace(/,/g, ''); 
   
    console.log(finalNumber);
  }

