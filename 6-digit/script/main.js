const tableNumberOfCases = 30;
const numCartesMain = 5;
const startingPoints = 10;
const startingTime = 30;
const numCardsJeu = 55;
const pointsGagnés = 5;
const pointsPerdus = 2;
const pointsPerdusSiPioche = 3;
const pointsPerdusSiTimeOut = 1;
const maxGameTime = 30; //30 seconds pour réflechir!

// musique
const audioTimeUp = new Audio('../assets/timeup.mp3');
const audioTicTac = new Audio('../assets/tictac.mp3');
const audioPlayerWins = new Audio('../assets/win.mp3');
const audioPlayerGameOver = new Audio('../assets/gameOver.mp3');

let selectedCard = 0;
let timeLimite = false;
let points = startingPoints; //number initial de points!
let gameTime = maxGameTime;
let main = [];
let pioche = [];
let chrono = null;
let musicIsOn = false;

const createGame = function(){
  const image = document.createElement("img");
  const imageContainer = document.querySelector(".imageCarte");
  const card = document.querySelector(".structureCarte");
  const pioche = document.querySelector("#pioche");
  const root = document.documentElement; // Sélectionne l'élément racine
  const computedStyle = getComputedStyle(root); // Obtient les styles calculés
  const caseWidth = computedStyle.getPropertyValue("--caseWidth").trim(); // Récupère la variable CSS
  const caseHeight = computedStyle.getPropertyValue("--caseHeight").trim(); // Récupère la variable CSS
  
  for (let index = 0; index < tableNumberOfCases; index++) {
    const cardCell = document.createElement("canvas");
    
    cardCell.width = `${caseWidth}`;
    cardCell.height = `${caseHeight}`;
    
    cardCell.className = "canvas";
    cardCell.id = "cell" + index;
    
    card.append(cardCell);
  }

  image.id = "image";
  image.className = 'leaderCard';
  imageContainer.append(image);

  pioche.addEventListener("click", event => {
    addCard(piocher());
    points -= pointsPerdusSiPioche;
    showPoints();
  });
}


const init = function () {
  const timer = document.querySelector('.timer');

  document.querySelector('.divShow').style.display = 'block';
  document.querySelector('.cardContainer').style.display = 'block';

  // set initial number of points
  points = startingPoints;
  showPoints();

  // set initial timing
  gameTime = startingTime;
  timer.innerText = gameTime;
  chrono = setInterval(timerFunction, 1000);

  // set initial sound mode
  musicIsOn = false;
 
  // set pioche
  createPioche();

  //set the starting card
  setGameCard(piocher());

  // set player cards
  main = [];
  commencerMain();
};

const TakeCardNumber = function(str){
  const cardNumber = parseInt(str.substring(str.lastIndexOf('/')+1, str.lastIndexOf('.')));
  
  return cardNumber;
}

const getCardPosition = function(str){  
  const cardPosition = str.substring(str.indexOf('n')+1);

  return cardPosition-1;
}

const removeCardMain = function(card){
  card.remove();
}

const showPoints = function(){
  const pointsBox = document.querySelector('.points');
  
  if (points < 0) points = 0;

  pointsBox.innerText = points;

  if (points === 0){
    // le chrono s'arrête
    playerLooses();
  }
}

const generateRandom = function(max){
  return Math.floor(Math.random() * max);
}

const createPioche = function(){
  let cardBuffer = []; 
  pioche = [];
  let position = 0;
  
  for (let index=0; index < numCardsJeu; index++){
    cardBuffer[index] = index + 1;
  }
  
  let tampon;
  while(cardBuffer.length > 0){
    position = generateRandom(cardBuffer.length);
    tampon = cardBuffer[position];
    cardBuffer[position] = cardBuffer[cardBuffer.length-1];
    cardBuffer.pop();
    pioche.push(tampon);     
  }
}

const mettreCarteDansLaPioche = function(card){
  // on stocke le contenu précédent de la pioche
  const avant = pioche.slice();

  // on vide la pioche
  pioche = [];
  // on stock dans la pioche le nouveau élement + la pioche précédente
  console.log(avant);  
  console.log(card);
  pioche.push(card,...avant);
  console.log(pioche);
};


const createCard = function(){
  const numCard = piocher();
  const card = document.createElement('img');

  main.push(numCard);
  card.src = `assets/${numCard}.jpg`;
  card.id = 'main';

  // console.log(`main: ${numCard}`);
  
  card.className = 'mainCard';
  card.addEventListener("click", (event) => {    
    const cardImage = event.target.src;
    const cardPosition = getCardPosition(event.target.id);   
    const number = TakeCardNumber(cardImage);

    const validationCarte = getNeighbours(selectedCard).includes(parseInt(number));
    console.log(getNeighbours(selectedCard).includes(parseInt(number)));


    // test: 
    
    // const validationCarte = true;

    if (validationCarte) {      
        // c'est une reusite
        //incrementer les points...
        console.log("hola");
        
        points += pointsGagnés;
        showPoints();
        // on remet la carte précendete dans la pioche
        mettreCarteDansLaPioche(selectedCard);
        // on actualise le carte à jouer        
        selectedCard = number;
        // update leaderCard
        setGameCard(number);
        drawFigure(number);
        removeCardMain(event.target);
        // tester si l'on a plus de cartes dans la main pour finir le jeu
        if(document.querySelector('.cardContainer').firstChild === null){
          // you win!
          playerWins();
        }; 
    } else {
        // you loose
        // décrementer les points...
        points -= pointsPerdus;
        showPoints();
    }
  });  
  return card;
}

const playerWins = function(){
  const game = document.querySelector('.divShow');
  const winnerTitle = document.querySelector('#uWin');
  const tryAgainLogo = document.querySelector('#tryAgain');

  // le chrono s'arrête
  clearTimeout(chrono);
  audioTicTac.pause();
  audioTimeUp.pause();
  audioPlayerWins.play();
  document.querySelector('.divShow').style.display = 'none';
  document.querySelector('.cardContainer').style.display = 'none';

  winnerTitle.style.display = 'block';
  tryAgainLogo.style.display = 'block';
  configButtonPlayAgain();
}

const playerLooses = function(){
  const game = document.querySelector('.divShow');
  const LosserTitle = document.querySelector('#uLoose');
  const tryAgainLogo = document.querySelector('#tryAgain');


  // le chrono s'arrête
  clearTimeout(chrono);
  audioTicTac.pause();
  audioTimeUp.pause();  
  audioPlayerGameOver.play();
  document.querySelector('.divShow').style.display = 'none';
  document.querySelector('.cardContainer').style.display = 'none';

  LosserTitle.style.display = 'block';
  tryAgainLogo.style.display = 'block';
  configButtonPlayAgain();
}

const configButtonPlayAgain = function(){
  const game = document.querySelector('.divShow');
  const looserTitle = document.querySelector('#uLoose');
  const tryAgainLogo = document.querySelector('#tryAgain');
  const winnerTitle = document.querySelector('#uWin');

  audioPlayerWins.pause();
  audioPlayerGameOver.pause();
  
  tryAgainLogo.addEventListener('click',()=>{
    looserTitle.style.display = 'none';
    winnerTitle.style.display = 'none';
    tryAgainLogo.style.display = 'none';
    init();
  });
}

const commencerMain = function () {
  const cardContainer = document.querySelector('.cardContainer');

  cardContainer.innerHTML = '';

  for (let index = 0; index < numCartesMain; index++) {
    const card = createCard();

    cardContainer.append(card);
  }
  
  
};

const piocher = function () {
  const cartePioché =  pioche.pop();
  
  return cartePioché;
};

const timerFunction = function (){
  const timer = document.querySelector('.timer');
  
  timer.innerText = gameTime;

  timeLimite = (gameTime >= 0) && (gameTime<=10);
  
  if(timeLimite){
      timer.style.color = "tomato";
      if(!musicIsOn) {
        audioTicTac.play();
        musicIsOn = true;
      }
  }else{
      timer.style.color = "black";
  }

  if(gameTime === 0){
    audioTicTac.pause();
    audioTimeUp.play();
    musicIsOn = false;
    points -= pointsPerdusSiTimeOut;
    showPoints();
    gameTime = maxGameTime;
  }else gameTime -= 1;
}

const setGameCard = function(card){
  const gameCard = card;
  const image = document.querySelector(".leaderCard");

  selectedCard = gameCard;
  image.src = "assets/" + getImage(gameCard);
  drawFigure(gameCard);
  // console.log(`selected card: ${gameCard}`);
  
}

const getCard = function (c) {  
  return carte[c].structure;  
};

const getNeighbours = function (c) {
  return carte[c].voisins;
};

const getImage = function (c) {
  return carte[c].image;
};

const addCard = function (c) {
  const cardContainer = document.querySelector('.cardContainer');
  
  cardContainer.append(createCard());  
};

const drawFigure = function (carte) {
  const cardDesign = getCard(carte);
  const segmentColor = getComputedStyle(root)
    .getPropertyValue("--segmentColor")
    .trim();

  for (let index = 0; index < tableNumberOfCases; index++) {
    const cardCell = document.querySelector(`#cell${index}`);
    context = cardCell.getContext("2d");
    context.clearRect(0, 0, caseWidth, caseHeight);
    context.fillStyle = "gold"; //segmentColor;
    const pattern = cardDesign[index];

    pattern.split("").forEach((elem) => {
      switch (elem) {
        case "A":
          break;
        case "B":
          context.fillRect(
            segmentType.B.x,
            segmentType.B.y,
            segmentType.B.width,
            segmentType.B.height,
          );
          break;
        case "C":
          context.fillRect(
            segmentType.C.x,
            segmentType.C.y,
            segmentType.C.width,
            segmentType.C.height,
          );
          break;
        case "D":
          context.fillRect(
            segmentType.D.x,
            segmentType.D.y,
            segmentType.D.width,
            segmentType.D.height,
          );
          break;
        case "E":
          context.fillRect(
            segmentType.E.x,
            segmentType.E.y,
            segmentType.E.width,
            segmentType.E.height,
          );
          break;
      }
    });
  }
};

// Entrée ppal.
createGame();
init();
// drawFigure(10);
