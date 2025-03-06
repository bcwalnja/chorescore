/* 

*/

const timerElements = [
  document.getElementById('timer1'),
  document.getElementById('timer2')
];

let timers = [
  { intervalId: null, seconds: 0 },
  { intervalId: null, seconds: 0 }
];

function startAllTimers() {
  timers.forEach((_, index) => startTimer(`timer${index + 1}`));
}

function startTimer(index) {
  //select only the numbers from string 'index' and parse to int in order to find the timer
  index = parseInt(index.replace(/\D/g, ''), 10) - 1;
  if (timers[index].intervalId) {
    console.log(`timer${index + 1} is already running`);
    return;
  }

  timers[index].intervalId = setInterval(() => {
    let initialValue = parseInt(document.getElementById('initialValue').value);
    if (initialValue && timers[index].seconds < initialValue) {
      timers[index].seconds = initialValue;
    }
    timers[index].seconds += 1;
    const minutes = Math.floor(timers[index].seconds / 60);
    const seconds = timers[index].seconds % 60;
    timerElements[index].value = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    console.log(`timer${index + 1} elapsed time: ${timers[index].seconds} seconds`);
    updateTotal();
  }, 1000);
}

function stopTimer(index) {
  //select only the numbers from string 'index' and parse to int in order to find the timer
  index = parseInt(index.replace(/\D/g, ''), 10) - 1;
  if (!timers[index].intervalId) {
    console.log(`timer${index + 1} is not running`);
    return;
  }

  clearInterval(timers[index].intervalId);
  timers[index].intervalId = null;
  console.log(`timer${index + 1} stopped at ${timers[index].seconds} seconds`);
}

let penalties = [0, 0];

const penaltyElements = [
  document.getElementById('penalty1'),
  document.getElementById('penalty2')
];

penaltyElements.forEach((element, index) => {
  element.addEventListener('input', (event) => {
    penalties[index] = parseInt(event.target.value, 10) || 0;
    console.log(`penalty${index + 1} updated to ${penalties[index]}`);
    updateTotal();
  });
});

const totalElements = [
  document.getElementById('total1'),
  document.getElementById('total2')
];

function updateTotal() {
  timers.forEach((timer, index) => {
    const minutes = Math.floor(timer.seconds / 60);
    const penalty = penalties[index];
    let total = penalty + minutes;
    totalElements[index].value = total;
  });
}

function setBorderColor(wrapperId, color) {
  const element = document.getElementById(wrapperId);
  element.style.backgroundColor = color;
}

function saveScoreToCache() {
  let games = JSON.parse(localStorage.getItem('games')) || [];
  const timestamp = new Date().toISOString();
  const gameData = {
    timestamp: timestamp,
    scores: timers.map((timer, index) => ({
      seconds: timer.seconds,
      penalty: penalties[index],
      teamColor: document.getElementById(`team-${index + 1}-color`).value
    }))
  };
  games.push(gameData);
  localStorage.setItem('games', JSON.stringify(games));
  console.log(`Saved game data to cache:`, gameData);
}
function startTournament() {
  const tournamentEndTime = localStorage.getItem('tournamentEndTime');
  if (tournamentEndTime && new Date(tournamentEndTime) > new Date()) {
    console.log('Cannot start tournament before the previous one ends');
    return;
  }
  if (localStorage.getItem('tournamentStartTime')) {
    console.log('Tournament is already started');
    return;
  }
  localStorage.setItem('tournamentStartTime', new Date().toISOString());
  console.log('Tournament started');
}

function endTournament() {
  const tournamentStartTime = localStorage.getItem('tournamentStartTime');
  if (!tournamentStartTime) {
    console.log('Tournament has not started');
    return;
  }

  const tournamentEndTime = new Date().toISOString();
  if (new Date(tournamentEndTime) < new Date(tournamentStartTime)) {
    console.log('Cannot end tournament before it starts');
    return;
  }

  const games = JSON.parse(localStorage.getItem('games')) || [];
  const tournamentData = {
    startTime: tournamentStartTime,
    endTime: tournamentEndTime,
    games: games
  };

  localStorage.setItem('tournamentData', JSON.stringify(tournamentData));
  localStorage.setItem('tournamentEndTime', tournamentEndTime);
  localStorage.removeItem('tournamentStartTime');
  console.log('Tournament ended', tournamentData);
}

const allPossibleNamedColors = [
  'AliceBlue',
   'AntiqueWhite',
   'Aqua',
   'Aquamarine',
   'Azure',
   'Beige',
   'Bisque',
   'Black',
   'BlanchedAlmond',
   'Blue',
  'BlueViolet',
   'Brown',
   'BurlyWood',
   'CadetBlue',
   'Chartreuse',
   'Chocolate',
   'Coral',
   'CornflowerBlue',
   'Cornsilk',
  'Crimson',
   'Cyan',
   'DarkBlue',
   'DarkCyan',
   'DarkGoldenRod',
   'DarkGray',
   'DarkGrey',
   'DarkGreen',
   'DarkKhaki',
  'DarkMagenta',
   'DarkOliveGreen',
   'DarkOrange',
   'DarkOrchid',
   'DarkRed',
   'DarkSalmon',
   'DarkSeaGreen',
   'DarkSlateBlue',
  'DarkSlateGray',
   'DarkSlateGrey',
   'DarkTurquoise',
   'DarkViolet',
  'DeepPink',
   'DeepSkyBlue',
   'DimGray',
   'DimGrey',
   'DodgerBlue',
   'FireBrick',
   'FloralWhite',
   'ForestGreen',
   'Fuchsia',
  'Gainsboro',
   'GhostWhite',
   'Gold',
   'GoldenRod',
   'Gray',
   'Grey',
   'Green',
   'GreenYellow',
   'HoneyDew',
   'HotPink',
  'IndianRed',
   'Indigo',
   'Ivory',
   'Khaki',
   'Lavender',
   'LavenderBlush',
   'LawnGreen',
   'LemonChiffon',
   'LightBlue',
  'LightCoral',
   'LightCyan',
   'LightGoldenRodYellow',
   'LightGray',
   'LightGrey',
   'LightGreen',
   'LightPink',
   'LightSalmon',
  'LightSeaGreen',
   'LightSkyBlue',
   'LightSlateGray',
   'LightSlateGrey',
   'LightSteelBlue',
   'LightYellow',
   'Lime',
   'LimeGreen',
  'Linen',
   'Magenta',
   'Maroon',
   'MediumAquaMarine',
   'MediumBlue',
   'MediumOrchid',
   'MediumPurple',
   'MediumSeaGreen',
  'MediumSlateBlue',
   'MediumSpringGreen',
   'MediumTurquoise',
   'MediumVioletRed',
   'MidnightBlue',
   'MintCream',
   'MistyRose',
  'Moccasin',
   'NavajoWhite',
   'Navy',
   'OldLace',
   'Olive',
   'OliveDrab',
   'Orange',
   'OrangeRed',
   'Orchid',
   'PaleGoldenRod',
  'PaleGreen',
   'PaleTurquoise',
   'PaleVioletRed',
   'PapayaWhip',
   'PeachPuff',
   'Peru',
   'Pink',
   'Plum',
   'PowderBlue',
   'Purple',
  'RebeccaPurple',
   'Red',
   'RosyBrown',
   'RoyalBlue',
   'SaddleBrown',
   'Salmon',
   'SandyBrown',
   'SeaGreen',
   'SeaShell',
   'Sienna',
  'Silver',
   'SkyBlue',
   'SlateBlue',
   'SlateGray',
   'SlateGrey',
   'Snow',
   'SpringGreen',
   'SteelBlue',
   'Tan',
   'Teal',
   'Thistle',
  'Tomato',
   'Turquoise',
   'Violet',
   'Wheat',
   'White',
   'WhiteSmoke',
   'Yellow',
   'YellowGreen'
];
