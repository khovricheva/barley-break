const gameArea = document.createElement('div'); // eslint-disable-line
gameArea.classList.add('game-area');
document.body.append(gameArea); // eslint-disable-line

const setupPanel = document.createElement('div'); // eslint-disable-line
setupPanel.classList.add('setup-panel');
gameArea.append(setupPanel);

const infoPanel = document.createElement('div'); // eslint-disable-line
infoPanel.classList.add('info-panel');
gameArea.append(infoPanel);

const field = document.createElement('div'); // eslint-disable-line
field.classList.add('field');
gameArea.append(field);

const newGameBtn = document.createElement('button'); // eslint-disable-line
newGameBtn.innerText = 'New Game';
newGameBtn.classList.add('new-game-btn');
setupPanel.append(newGameBtn);

const saveGameBtn = document.createElement('button'); // eslint-disable-line
saveGameBtn.innerText = 'Save Game';
setupPanel.append(saveGameBtn);

const savedGamesBtn = document.createElement('button'); // eslint-disable-line
savedGamesBtn.innerText = 'Saved games';
savedGamesBtn.classList.add('saved-games-btn');

const bestScoresBtn = document.createElement('button'); // eslint-disable-line
bestScoresBtn.innerText = 'Best scores';
bestScoresBtn.classList.add('best-scores-btn');
setupPanel.append(bestScoresBtn);

const settingsBtn = document.createElement('button'); // eslint-disable-line
settingsBtn.innerText = 'Settings';
settingsBtn.classList.add('settings-btn');
setupPanel.append(settingsBtn);

const gameDuration = document.createElement('div'); // eslint-disable-line
infoPanel.append(gameDuration);

const numOfMoves = document.createElement('div'); // eslint-disable-line
infoPanel.append(numOfMoves);

const soundBtn = document.createElement('button'); // eslint-disable-line
soundBtn.innerHTML = 'Sound';
soundBtn.classList.add('on');

const imageBtn = document.createElement('button'); // eslint-disable-line
imageBtn.innerHTML = 'Image field';
imageBtn.classList.add('on');

const chooseFieldSize = document.createElement('select'); // eslint-disable-line
chooseFieldSize.id = 'select';
chooseFieldSize.innerHTML =
  '<option value="3">3x3</option><option value="4" selected>4x4</option><option value="5">5x5</option><option value="6">6x6</option><option value="7">7x7</option><option value="8">8x8</option>'; // eslint-disable-line

const modal = document.createElement('div'); // eslint-disable-line
modal.classList.add('modal');

const closeModalBtn = document.createElement('button');
closeModalBtn.innerHTML = '&times;';
closeModalBtn.classList.add('close-button');

const overlay = document.createElement('div');
overlay.id = 'overlay';
gameArea.appendChild(overlay);

export {
  gameArea,
  setupPanel,
  infoPanel,
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
  modal,
  closeModalBtn,
  overlay,
};
