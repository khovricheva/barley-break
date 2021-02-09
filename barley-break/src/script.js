import {
  field,
  newGameBtn,
  savedGamesBtn,
  bestScoresBtn,
  settingsBtn,
  gameDuration,
  numOfMoves,
  soundBtn,
  imageBtn,
  chooseFieldSize,
  saveGameBtn,
  closeModalBtn,
  modal,
  overlay,
} from './createLayout.js';
import Modal from './modal.js';
import { data } from './data.js';

export default class Game {
  constructor(fieldSize) {
    this.fieldSize = fieldSize;

    this.field = field;
    this.gameDuration = gameDuration;
    this.numOfMoves = numOfMoves;
    this.soundBtn = soundBtn;
    this.imageBtn = imageBtn;
    this.list;
    this.time = '00:00';
    this.tick = '';
    this.rightPositions = [];
    this.cells = [];
    this.usersMoves = [];
    this.movesCounter = 0;
    this.soundOn = true;
    this.imageField = true;
    this.movesSound = new Audio('./audio/move.wav');
    this.winSound = new Audio('./audio/win.wav');

    this.timer = {};
  }

  initiateGame(fieldSize) {
    this.time = '00:00';
    this.field.innerHTML = '';
    this.movesCounter = 0;
    this.cells = [];
    this.numOfMoves.innerHTML = `Moves: ${this.movesCounter}`;

    switch (fieldSize) {
      case 3:
        this.cellSize = 132;
        this.list = data[0];
        break;
      case 4:
        this.cellSize = 100;
        this.list = data[1];
        break;
      case 5:
        this.cellSize = 80;
        this.list = data[2];
        break;
      case 6:
        this.cellSize = 65;
        this.list = data[3];
        break;
      case 7:
        this.cellSize = 57;
        this.list = data[4];
        break;
      case 8:
        this.cellSize = 50;
        this.list = data[5];
        break;
    }
    this.createField(this.list, this.cellSize, fieldSize);

    this.numOfMoves.innerHTML = `Moves: ${this.movesCounter}`;
    this.gameDuration.innerHTML = `Time: ${this.time}`;

    clearInterval(this.tick);
    this.countTime();
  }

  moveCell(index) {
    const cell = this.cells[index];
    const empty = this.cells.find((item) => item.value === 0);

    const leftDiff = Math.abs(empty.left - cell.left);
    const topDiff = Math.abs(empty.top - cell.top);

    if (leftDiff + topDiff > 1) {
      return; // eslint-disable-line
    } else {
      if (cell.value !== 0) this.movesCounter += 1;
      if (this.soundOn && cell.value !== 0) this.movesSound.play();
      this.numOfMoves.innerHTML = `Moves: ${this.movesCounter}`;
    }

    cell.element.style.left = `${empty.left * this.cellSize}px`;
    cell.element.style.top = `${empty.top * this.cellSize}px`;
    empty.element.style.left = `${cell.left * this.cellSize}px`;
    empty.element.style.top = `${cell.top * this.cellSize}px`;

    const emptyLeft = empty.left;
    const emptyTop = empty.top;
    empty.left = cell.left;
    empty.top = cell.top;
    cell.left = emptyLeft;
    cell.top = emptyTop;

    if (!this.usersMoves.includes(cell)) this.usersMoves.push(cell);

    this.checkWin();
  }

  createField(list, cellSize, size) {
    this.checkSolvability(list, size);
    this.createCells(list, cellSize, size);
  }

  checkSolvability(list, size) {
    let generatorDone = 0;
    if (size % 2 === 0) {
      while (generatorDone === 0) {
        list.sort(() => Math.random() - 0.5);
        let zeroRow;
        const zr = list.findIndex((el) => el === 0);
        switch (size) {
          case 4:
            if (zr <= 3) {
              zeroRow = 1;
            } else if (zr > 3 && zr <= 7) {
              zeroRow = 2;
            } else if (zr > 7 && zr <= 11) {
              zeroRow = 3;
            } else if (zr > 11 && zr <= 15) {
              zeroRow = 4;
            }
            break;
          case 6:
            if (zr <= 5) {
              zeroRow = 1;
            } else if (zr > 5 && zr <= 11) {
              zeroRow = 2;
            } else if (zr > 11 && zr <= 17) {
              zeroRow = 3;
            } else if (zr > 17 && zr <= 23) {
              zeroRow = 4;
            } else if (zr > 23 && zr <= 29) {
              zeroRow = 5;
            } else if (zr > 29 && zr <= 35) {
              zeroRow = 6;
            }
            break;
          case 8:
            if (zr <= 7) {
              zeroRow = 1;
            } else if (zr > 7 && zr <= 15) {
              zeroRow = 2;
            } else if (zr > 15 && zr <= 23) {
              zeroRow = 3;
            } else if (zr > 23 && zr <= 31) {
              zeroRow = 4;
            } else if (zr > 31 && zr <= 39) {
              zeroRow = 5;
            } else if (zr > 39 && zr <= 47) {
              zeroRow = 6;
            } else if (zr > 47 && zr <= 55) {
              zeroRow = 7;
            } else if (zr > 55 && zr <= 63) {
              zeroRow = 8;
            }
            break;
        }
        let inv = 0;
        for (let i = 0; i < list.length; i += 1) {
          for (let j = i + 1; j < list.length; j += 1) {
            if (list[i] > list[j] && list[j] !== 0) inv += 1;
          }
        }
        inv += zeroRow;
        if (inv % 2 === 0) generatorDone = 1;
      }
    } else {
      while (generatorDone === 0) {
        list.sort(() => Math.random() - 0.5);
        let inv = 0;
        for (let i = 0; i < list.length; i += 1) {
          for (let j = i + 1; j < list.length; j += 1) {
            if (list[i] > list[j] && list[j] !== 0) inv += 1;
          }
        }
        if (inv % 2 === 0) generatorDone = 1;
      }
    }
    return list;
  }

  createCells(list, cellSize, size) {
    for (let i = 0; i <= list.length - 1; i += 1) {
      const cell = document.createElement('div');

      const value = list[i];
      cell.className = 'cell';
      const left = i % size;
      const top = (i - left) / size;

      if (value === 0) {
        cell.innerHTML = '';
        cell.style.background = 'none';
        cell.style.border = 'none';
        cell.style.boxShadow = 'none';
      } else {
        if (!this.imageField) cell.innerHTML = value;
      }

      this.cells.push({
        value,
        left,
        top,
        element: cell,
      });

      if (this.imageField) {
        if (value !== 0)
          cell.style.backgroundImage = `url(./images/${size}/1/${value}.jpg)`;
        cell.style.backgroundSize = 'cover';
      }
      cell.style.width = `${cellSize}px`;
      cell.style.height = `${cellSize}px`;
      cell.style.left = `${left * cellSize}px`;
      cell.style.top = `${top * cellSize}px`;
      cell.style.fontSize = `${cellSize / 2}px`;

      this.field.append(cell);
      this.dragAndDrop(cell, i);

      cell.addEventListener('click', () => this.moveCell(i));
    }
  }

  startNewGame() {
    this.initiateGame(Math.sqrt(this.cells.length));
  }

  checkWin() {
    let rightPosCounter = 0;

    for (let i = 0; i < this.cells.length; i++) {
      if (
        this.cells[i].value - 1 ===
        this.cells[i].top * Math.sqrt(this.cells.length) + this.cells[i].left
      ) {
        rightPosCounter += 1;
      }
    }
    if (rightPosCounter === this.cells.length - 1) {
      clearInterval(this.tick);
      this.finishGame();
      this.addNewScore();
    }
  }

  addNewScore() {
    this.bestScores = JSON.parse(localStorage.getItem('scores'));
    if (this.bestScores === null) this.bestScores = [];

    this.bestScores.push({
      time: this.time,
      moves: this.movesCounter,
      size: Math.sqrt(this.cells.length),
    });

    localStorage.setItem('scores', JSON.stringify(this.bestScores));
  }

  countTime() {
    const start = new Date();
    let now;
    let diffTme;

    this.tick = setInterval(() => {
      now = new Date();
      diffTme = (now.getTime() - start.getTime()) / 1000;

      const hrs = Math.floor(diffTme / 3600);
      const mins = Math.floor((diffTme % 3600) / 60);
      const secs = Math.floor(diffTme % 60);

      this.time = '';

      if (hrs > 0) this.time += `${hrs}:${mins < 10 ? '0' : ''}`;

      this.time += `${mins < 10 ? '0' : ''}${mins}:${
        secs < 10 ? '0' : ''
      }${secs}`;
      this.gameDuration.innerHTML = `Time: ${this.time}`;
    }, 1000);
  }

  dragAndDrop(cell, index) {
    cell.draggable = true; // eslint-disable-line

    cell.addEventListener('dragstart', () => {
      setTimeout(() => {
        cell.classList.add('hide');
      }, 0);
    });

    cell.addEventListener('dragend', () => {
      cell.classList.remove('hide');
      this.moveCell(index);
    });

    cell.addEventListener('dragenter', () => {});
  }

  togglePlaySound() {
    this.soundOn = !this.soundOn;
    this.soundOn
      ? soundBtn.classList.add('on')
      : soundBtn.classList.remove('on');
  }

  toggleImageField() {
    this.imageField = !this.imageField;
    this.imageField
      ? imageBtn.classList.add('on')
      : imageBtn.classList.remove('on');
  }

  finishGame() {
    this.winSound.play();
    let modal = new Modal('div');
    const message = `Hooray! <br/> You have solved the puzzle!  <br/> Your time - ${this.time}, your moves - ${this.movesCounter}!`;
    modal.create('div', message);
  }

  saveGame() {
    this.savedGames = JSON.parse(localStorage.getItem('games'));
    if (this.savedGames === null) this.savedGames = [];

    this.savedGames.push({
      time: this.time,
      moves: this.movesCounter,
      cells: this.cells,
      size: Math.sqrt(this.cells.length),
    });

    localStorage.setItem('games', JSON.stringify(this.savedGames));
    let modal = new Modal('div');
    let message =
      'Game saved! You can return to the game in Settings -> Saved games';
    modal.create('div', message);
  }

  showSavedGames() {
    this.savedGames = JSON.parse(localStorage.getItem('games'));
    let modal = new Modal('div');
    modal.create('div', '');

    let heading = document.createElement('div');
    heading.innerHTML = 'Saved games';
    modal.append(heading);

    if (this.savedGames.length > 10)
      this.savedGames.splice(10, this.savedGames.length - 1);

    for (let i = 0; i <= this.savedGames.length - 1; i++) {
      let game = document.createElement('div');
      game.classList.add('saved-game');
      game.id = i + 1;
      game.innerHTML = `Game ${i + 1}) Board size:${this.savedGames[i].size}*${
        this.savedGames[i].size
      } Time:${this.savedGames[i].time} Moves:${this.savedGames[i].moves}`;
      game.classList.add('row-games');

      modal.append(game);
    }

    const gamesList = document.getElementsByClassName('saved-game');
    let indexGame;
    for (let i = 0; i <= gamesList.length - 1; i++) {
      gamesList[i].addEventListener('click', () => {
        indexGame = gamesList[i].id;
        this.playSavedGame(this.savedGames[indexGame - 1]);
        modal.close();
      });
    }
  }

  playSavedGame(game) {
    this.time = game.time;
    this.field.innerHTML = '';
    this.movesCounter = game.moves;
    this.numOfMoves.innerHTML = `Moves: ${this.movesCounter}`;
    this.gameDuration.innerHTML = `Time: ${this.time}`;
    this.cells = [];

    switch (game.size) {
      case 3:
        this.cellSize = 132;
        break;
      case 4:
        this.cellSize = 100;
        break;
      case 5:
        this.cellSize = 80;
        break;
      case 6:
        this.cellSize = 65;
        break;
      case 7:
        this.cellSize = 57;
        break;
      case 8:
        this.cellSize = 50;
        break;
    }

    for (let i = 0; i < game.cells.length; i += 1) {
      const cell = document.createElement('div'); // eslint-disable-line

      const value = game.cells[i].value;
      const left = game.cells[i].left;
      const top = game.cells[i].top;
      cell.className = 'cell';

      if (value === 0) {
        cell.innerHTML = '';
        cell.style.background = 'none';
        cell.style.border = 'none';
        cell.style.boxShadow = 'none';
      } else {
        cell.innerHTML = value;
      }

      this.cells.push({
        value,
        left,
        top,
        element: cell,
      });

      cell.style.width = `${this.cellSize}px`;
      cell.style.height = `${this.cellSize}px`;

      cell.style.left = `${left * this.cellSize}px`;
      cell.style.top = `${top * this.cellSize}px`;
      cell.style.fontSize = `${this.cellSize / 2}px`;

      this.field.append(cell);

      this.dragAndDrop(cell, i);
      cell.addEventListener('click', () => {
        this.moveCell(i);
      });
    }
  }

  showBestScores() {
    this.bestScores = JSON.parse(localStorage.getItem('scores'));
    let modal = new Modal('div');
    modal.create('div', '');

    let heading = document.createElement('div');
    heading.innerHTML = 'Best scores';
    modal.append(heading);

    this.bestScores.sort((a, b) => (a.moves > b.moves ? 1 : -1));

    if (this.bestScores.length > 10)
      this.bestScores.splice(10, this.bestScores.length - 1);

    for (let i = 0; i <= this.bestScores.length - 1; i++) {
      let game = document.createElement('div');
      game.classList.add('row-score');
      game.innerHTML = `Board size:${this.bestScores[i].size}*${this.bestScores[i].size} Time:${this.bestScores[i].time} Moves:${this.bestScores[i].moves}`;
      modal.append(game);
    }
  }
}

const game = new Game();
window.onload = game.initiateGame(4); // eslint-disable-line

newGameBtn.addEventListener('click', () => game.startNewGame());
soundBtn.addEventListener('click', () => game.togglePlaySound());
imageBtn.addEventListener('click', () => game.toggleImageField());

settingsBtn.addEventListener('click', () => {
  const settings = new Modal('div');
  settings.create('div', '');
  settings.append(soundBtn);
  settings.append(imageBtn);
  settings.append(chooseFieldSize);
  settings.append(savedGamesBtn);
  chooseFieldSize.addEventListener('change', (e) =>
    game.initiateGame(Number(e.target.value))
  );
});
savedGamesBtn.addEventListener('click', () => game.showSavedGames());
bestScoresBtn.addEventListener('click', () => game.showBestScores());
saveGameBtn.addEventListener('click', () => game.saveGame());
closeModalBtn.addEventListener('click', () => {
  modal.classList.remove('active');
  overlay.classList.remove('active');
});
