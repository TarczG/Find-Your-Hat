const { read } = require('fs');

const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(height, width) {
    this._width = width;
    this._height = height;
    this._xCurrentPosition = 0;
    this._yCurrentPosition = 0;
    this._xHatPosition;
    this._yHatPosition;
    this._inGame = true;
    this._win = false;
  }
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  get field() {
    return this._field;
  }
  set field(value) {
    this._field = value;
  }
  get xCurrentPosition() {
    return this._xCurrentPosition;
  }
  get yCurrentPosition() {
    return this._yCurrentPosition;
  }
  set xCurrentPosition(value) {
    this._xCurrentPosition = value;
  }
  set yCurrentPosition(value) {
    this._yCurrentPosition = value;
  }
  get xHatPosition() {
    return this._xHatPosition;
  }
  get yHatPosition() {
    return this._yHatPosition;
  }
  set xHatPosition(value) {
    this._xHatPosition = value;
  }
  set yHatPosition(value) {
    this._yHatPosition = value;
  }
  get inGame() {
    return this._inGame;
  }
  set inGame(value) {
    this._inGame = value;
  }
  get win() {
    return this._win;
  }
  set win(value) {
    this._win = value;
  }
  setRandomHatPositionX() {
    return this.xHatPosition = Math.floor(Math.random() * this.height);
  }
  setRandomHatPositionY() {
    return this.yHatPosition = Math.floor(Math.random() * this.height);
  }
  generateField() {
    this.field = new Array(this.height);
    let random;
    let symbol;
    for (let i = 0; i < this.field.length; i++) {
      this.field[i] = new Array(this.width);
    }
    for (let j = 0; j < this.field.length; j++) {
      for (let k = 0; k < this.field[j].length; k++) {
        random = Math.floor(Math.random() * 4);
        switch (random) {
          case 0: symbol = hole;
            break;
          default: symbol = fieldCharacter;
            break;
        }
        this.field[j][k] = symbol;
      }
    }
    this.field[this.setRandomHatPositionY()][this.setRandomHatPositionX()] = hat;
    this.field[this.yCurrentPosition][this.xCurrentPosition] = pathCharacter;
  }
  printField() {
    for (let j = 0; j < this.field.length; j++) {
      for (let k = 0; k < this.field[j].length; k++) {
        process.stdout.write(this.field[j][k]);
      }
      console.log();
    }
  }
  move(direction) {
    switch (direction) {
      case 'a':
        if (this.xCurrentPosition > 0) {
          this.xCurrentPosition--;
        }
        break;
      case 'd':
        if (this.xCurrentPosition < this.height - 1) {
          this.xCurrentPosition++;
        }
        break;
      case 'w':
        if (this.yCurrentPosition > 0) {
          this.yCurrentPosition--;
        }
        break;
      case 's':
        if (this.yCurrentPosition < this.width - 1) {
          this.yCurrentPosition++;
        }
        break;
    }
    if (this.field[this.yCurrentPosition][this.xCurrentPosition] === hole) {
      this.inGame = false;
    } else if (this.field[this.yCurrentPosition][this.xCurrentPosition] === hat) {
      this.inGame = false;
      this.win = true;
    }
    else {
      this.field[this.yCurrentPosition][this.xCurrentPosition] = pathCharacter;
    }
    this.printField();
  }
  restart() {
    this.yCurrentPosition = 0;
    this.xCurrentPosition = 0;
    this.generateField();
  }
}

const myField = new Field(10, 10);
let move;
let keepPlay = 'Y';

while (keepPlay === 'Y') {
  myField.restart();
  myField.inGame = true;
  while (myField.inGame) {
    myField.printField();
    move = prompt('What is Your move ?: ');
    myField.move(move);
    process.stdout.write('\033c');
  }
  myField.printField();
  if (myField.win) {
    console.log('Congratulations ! You Win !!!');
  } else {
    console.log('Sorry !!! Maybe next time !!!');
  }
  keepPlay = prompt('Wanna play Again ? Y/N: ');
}


