const emojis = ["🎃", "👻", "🦇", "👿", "🧛", "🧟", "💀 ", "🕸️"];
let emo = ["🧛", "🪱", "🕸️", "🍬", "🧿", "🕷️"];
const emoji = ["🤢", "😶‍🌫️", "😤", "😎", "💩", "🥶", "🤐", "🤬"];
let cards = [...emojis, ...emojis];
let attempts = 0;
let win = 0;

let audio = document.getElementById("audio");

function couple(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  cards = couple(cards);
  const gameBoard = document.getElementById("gameBoard");
  for (let i = 0; i < cards.length; i++) {
    const card = document.createElement("div");
    // card.style.background="#26173f"
    card.classList.add("card");
    card.dataset.index = i;
    card.dataset.emoji = cards[i];
    card.addEventListener("click", volteo);
    gameBoard.appendChild(card);
  }
}

let cardDescubierta = [];
let locked = false;

function volteo() {
  if (locked || this.classList.contains("boca_arriba")) return;

  if (cardDescubierta.length < 2) {
    this.classList.add("boca_arriba");
    this.style.backgroundColor = "#6E4E8A"; //colorboca
    audio.play();
    // this.style.transform = "perspective(500px)translate(10px,0,20px)";
    // this.style.transform = "rotateY(180deg)";

    // Espera un momento antes de mostrar el contenido
    this.innerText = this.dataset.emoji;
    cardDescubierta.push(this);
  }

  if (cardDescubierta.length === 2) {
    locked = true;
    setTimeout(checkForMatch, 1000);
  }
}
function checkForMatch() {
  if (cardDescubierta[0].dataset.emoji === cardDescubierta[1].dataset.emoji) {
    cardDescubierta[0].style.backgroundColor = "#6E4E8A";
    cardDescubierta[1].style.backgroundColor = "#6E4E8A";
    win++; // color boca arriba
  } else {
    cardDescubierta[0].innerText = " ";
    cardDescubierta[0].style.backgroundColor = "#26173f";
    cardDescubierta[0].classList.remove("boca_arriba");
    // cardDescubierta[0].classList.add("boca_abajo");

    cardDescubierta[1].innerText = " ";
    cardDescubierta[1].style.backgroundColor = "#26173f";
    cardDescubierta[1].classList.remove("boca_arriba");
    // cardDescubierta[1].classList.add("boca_abajo");

    //boca abajo
  }

  cardDescubierta = [];

  attempts++;
  document.getElementById("attempts").innerText = `Intentos: ${attempts}`;
  locked = false;

  document.getElementById("fin").innerText = ` Aciertos: ${win}`;
  if (win === emojis.length) {
    document.getElementById(
      "fin"
    ).innerText = `¡Juego completado! Aciertos: ${win}`;
    setTimeout(resetGame, 3000);
  }
}

createBoard();

document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("miAudio");

  // Establecer el volumen al 50% (rango de 0.0 a 1.0)
  audio.volume = 0.1;
});

function resetGame() {
  attempts = 0;
  win = 0;

  cardDescubierta = [];
  locked = false;
  const gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";

  document.body.style.backgroundRepeat = "repeat";
  document.body.style.backgroundSize = "auto 50px";

  createBoard();
}
