const emojis = ["🕷️", "🎃", "👻", "🦇", "👿", "🍭", "🧟", "💀 "];
let emo = ["🧛", "🪱", "🕸️", "🍬", "🧿"];
const emoji = ["🤢", "😶‍🌫️", "😤", "😎", "💩", "🥶", "🤐", "🤬"];
let cards = [...emojis, ...emojis];
let attempts = 0;
let win = 0;

function couple(array) {
  for (let i = 0; i < array.length; i++) {
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
    card.innerText = "🍬";
    card.classList.add("card");
    card.dataset.index = i;
    card.dataset.emoji = cards[i];
    card.addEventListener("click", volteo);
    gameBoard.appendChild(card);
  }
}

// function createBoard() {
//   cards = couple(cards);
//   const gameBoard = document.getElementById("gameBoard");
//   for (let i = 0; i < cards.length; i++) {
//     const card = document.createElement("div");
//     card.innerText = "❓";
//     card.classList.add("card");
//     card.dataset.index = i;
//     card.dataset.emoji = cards[i];
//     card.addEventListener("click", volteo);
//     gameBoard.appendChild(card);
//   }
// }

let cardDescubierta = [];
let locked = false;

function volteo() {
  if (locked || this.classList.contains("boca_arriba")) return;

  if (cardDescubierta.length < 2) {
    this.classList.add("boca_arriba");

    setTimeout(() => {
      this.innerText = this.dataset.emoji;
      this.style.backgroundColor = "red";

      cardDescubierta.push(this);
    }, 325);
  }

  if (cardDescubierta.length === 2) {
    locked = true;
    setTimeout(checkForMatch, 200);
  }
}

function checkForMatch() {
  if (cardDescubierta[0].dataset.emoji === cardDescubierta[1].dataset.emoji) {
    cardDescubierta[0].style.backgroundColor = "red";
    cardDescubierta[1].style.backgroundColor = "red";
    win++;
  } else {
    cardDescubierta[0].innerText = " ";
    cardDescubierta[0].style.backgroundColor = "white";
    cardDescubierta[0].classList.remove("boca_arriba");
    cardDescubierta[1].innerText = " ";
    cardDescubierta[1].style.backgroundColor = "white";
    cardDescubierta[1].classList.remove("boca_arriba");
  }

  cardDescubierta = [];
  attempts++;
  document.getElementById("attempts").innerText = `Intentos: ${attempts}`;
  locked = false;

  document.getElementById("fin").innerText = ` Aciertos: ${win}`;
  if (win === cards.length / 2) {
    document.getElementById(
      "fin"
    ).innerText = `¡Juego completado! Aciertos: ${win}`;
    setTimeout(resetGame, 3000);
  }
}

createBoard();

setInterval;
function resetGame() {
  attempts = 0;
  win = 0;
  cardDescubierta = [];
  locked = false;
  const gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";
  createBoard();
}
