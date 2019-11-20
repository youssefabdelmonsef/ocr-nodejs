const os = require('os');
const fs = require('fs');
var constants = require('./constants');

const fileName = constants.OCR_FILE_NAME;
let data;
let chunks = [];
let charPerLine = 0;
let charsToNumber = [];
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
  })
  console.log(3, chunks);
  
  getCharPerLine ()
}

  function getCharPerLine () {
    let i=0;
    while(chunks[i] !== '\n'){
      i++;
    }
    charPerLine = i+1;
    mapChar();
  }

  function mapChar() {
    let i=0;
    while (i<charPerLine-1) {
      console.log('Number in Sticks Mode');
      console.log(chunks[i]);
      console.log(chunks[i+charPerLine]);
      console.log(chunks[i+charPerLine+charPerLine]);
      
      compareAndConvert(chunks[i], chunks[i+charPerLine], chunks[i+charPerLine+charPerLine]);
      i++;
    }
  }

    function compareAndConvert(firstChar, secondChar, thirdChar) {
      // console.log(firstChar, secondChar, thirdChar);
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

      charsToNumber.push(currentNumber);
  }

  function printNumber() {
    let finalNumber = charsToNumber.join();
    /** regex to remove commas */
    finalNumber = finalNumber.replace(/,/g, ''); 
   
    console.log(finalNumber);
  }

