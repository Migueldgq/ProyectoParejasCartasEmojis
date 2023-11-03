const emojis = ["🎃", "👻", "🦇", "👿", "🍭", "🧟", "💀 ", "🕸️"];
let cards = [...emojis, ...emojis];
let attempts = 0;
let win = 0;
let seconds = 121;
let ArrayCards = [];
let ArrayEmojis = [];

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
    const cardSection = document.createElement("section");
    cardSection.classList.add("card");

    const cardContent = document.createElement("div");
    cardContent.classList.add("content");

    const cardFront = document.createElement("div");
    cardFront.classList.add("front");

    const cardBack = document.createElement("div");
    cardBack.classList.add("back");

    // const cards3 = cards[Math.floor(Math.random() * emojis.length)];

    // console.log(cards3);

    cardBack.innerHTML = cards[i];

    //console.log(cardBack.innerHTML);

    cardSection.appendChild(cardContent);
    cardContent.appendChild(cardFront);
    cardContent.appendChild(cardBack);

    gameBoard.appendChild(cardSection);
  }
}

createBoard();

// /* try1 */

// const cards2 = document.querySelectorAll(".card");

// const reveal = (e) => {
//   const currentCard = e.currentTarget;
//   currentCard.classList.add("flipped");
//   const iconito = currentCard.querySelector(".back").innerHTML;

//   console.log(iconito);

//   setTimeout(() => {
//     currentCard.classList.remove("flipped");
//   }, 1000);
// };

// for (const card of cards2) {
//   card.addEventListener("click", reveal);
// }

gameBoard.addEventListener("click", (e) => {
  let value = e.target.classList.contains("front");
  if (value) {
    const currentCard = e.target.parentElement;
    let emoji = currentCard.children[1].innerHTML;
    currentCard.classList.add("flipped");
    ArrayCards = [...ArrayCards, currentCard];
    ArrayEmojis = [...ArrayEmojis, emoji];

    console.log(ArrayEmojis);
    //console.log(ArrayCards);

    matchCardsVerification();
  }
});

const matchCardsVerification = () => {
  audio.play();
  if (ArrayCards.length < 3 && ArrayCards.length === 2) {
    if (ArrayEmojis[0] === ArrayEmojis[1]) {
      ArrayCards = [];
      ArrayEmojis = [];
      win++;
    } else {
      setTimeout(() => {
        ArrayCards[0].classList.remove("flipped");
        ArrayCards[1].classList.remove("flipped");
        ArrayCards = [];
        ArrayEmojis = [];
      }, 300);
    }
  }

  if (ArrayCards.length === 2) {
    attempts++;
  }
  document.getElementById("attempts").innerText = `Intentos: ${attempts}`;

  document.getElementById("fin").innerText = ` Aciertos: ${win}`;
  if (win === emojis.length) {
    document.getElementById("fin").innerText = `¡Juego completado!`;
    setTimeout(resetGame, 3000);
  }
};

// const timer = () => {
//   let tiempo = document.getElementById("timer");

//   setInterval(function () {
//     seconds--;
//     tiempo.textContent = `Tiempo: ${seconds}`;
//   }, 1000);
// };

gameBoard.addEventListener(
  "click",
  function () {
    let tiempo = document.getElementById("timer");

    setInterval((a) => {
      seconds--;
      tiempo.textContent = `Tiempo: ${seconds}`;
    }, 1000);
    if (win === 8) {
      clearInterval(a);
    }
  },
  { once: true }
);
