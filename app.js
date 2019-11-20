const os = require('os');
const fs = require('fs');
var constants = require('./constants');

/** get file name from constants file */
const fileName = constants.OCR_FILE_NAME;

/** data in the file */
let data;

/** all the characters represting the numbers comined */
let chunks = [];

/** characters represting each number splitted */
let chunksSplited = [];

/** characters per line */
let charPerLine = 0;

/** every character convered to number is pushed here */
let charsToNumber = [];

/** final number */
let finalNumber;

/** fs */
// async error handling
fs.readdir('./', function (err, files) {
  if (err) {
    console.log('Error no files', err);
  }
  else {

    if (files.indexOf(fileName) > -1) {

      data = fs.readFileSync(fileName, 'utf8');
      console.log('All files in dirctory are: ', files);
      console.log(`${fileName} contains:\n${data}`);

      /** entry function */
      getCharacter();

      /** function to display what is already converted */
      printNumber();
    }

    /** error if no files with given name */
    else {
      console.log('No files with given name')
    }
  }
});

/** get character function */
function getCharacter() {

  currentCharacter = 0;
  /** remove space */
  let flagRemoveSpace = false;

  /** array holding all data in file */
  dataArray = [...data];

  /** array holding the present 3 characters in x-direction */
  let tempArray = [];

  /** start index of each line */
  let startingIndex = 0;

  /** looping */
  dataArray.forEach((e, index) => {

    if (flagRemoveSpace) {
      /** removing the space */
      tempArray.pop();
      flagRemoveSpace = false;
    }

    /** every 3 characters to bigger array */
    if (tempArray.length === 3) {
      chunks.push(tempArray);
      tempArray = [];
      flagRemoveSpace = true
    }
    /** if new line, skip */
    if (e !== '\n') {
      tempArray.push(e);
    }
    /** push in chunks if end reached */
    if (index === dataArray.length - 1) {
      chunks.push(tempArray);
    }

    /** push new lines in chunk to deffrentiate between characters */
    if (e === '\n') {
      chunks.push(e);
    }
  });

  /** looping */
  chunks.forEach((char, index) => {

    if ((char === '\n' && chunks[index - 1] === '\n')) {
      chunksSplited.push(chunks.slice(startingIndex, index - 1));
      startingIndex = index + 1;
    }
    if (index === chunks.length - 1) {
      chunksSplited.push(chunks.slice(startingIndex, index + 1));
    }
  })

  /** getting number of characters per line and mapping */
  mapCharacters();
}

/** maps each character */
function mapCharacters() {

  /** looping on every chunk */
  chunksSplited.forEach((currentChunk, index) => {
    let i = 0;
    let j = 0;

    while (currentChunk[i] !== '\n') {
      i++;
    }
    /** getting number of characters per line */
    charPerLine = i + 1;

    while (j < charPerLine - 1) {
    /** combine every array related to current character and convert to tru number */
    compareAndConvert(currentChunk[j], currentChunk[j + charPerLine], currentChunk[j + charPerLine + charPerLine], charPerLine, j);
    j++;
  }
  })

}

/** compares input wth numbers known in constant file */
function compareAndConvert(firstChar, secondChar, thirdChar, charPerLine, i) {
  /** holds converted chunks of input to string for easier comparison */
  let arrayToString;

  /** check to prevent any data errors */
  if (Array.isArray(firstChar) && Array.isArray(secondChar) && Array.isArray(thirdChar)) {

    arrayToString = firstChar.join() + secondChar.join() + thirdChar.join();
  }

  /** combining data in constants */
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

  /** to store current number after conversion */
  let currentNumber;

  /** comparing */
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

    /** if not matching any of above, then add ' errorInData ' */
    default: currentNumber = ' errorInData ';

  }

  /** if end of line reached, add new line */
  const addNewLine = (charPerLine - 2 === i) ? '\n' : '';
  /** storing data */
  charsToNumber.push(currentNumber + addNewLine);
}

/** function to view number in a decent form */
function printNumber() {
  finalNumber = charsToNumber.join();
  /** regex to remove commas */
  finalNumber = finalNumber.replace(/,/g, '');
  
  /** to display data */
  console.log(finalNumber);
}

