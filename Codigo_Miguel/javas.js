const emojis = ["🎃", "👻", "🦇", "👿", "🍭", "🧟", "💀 ", "🕸️"];
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
    const cardSection = document.createElement("section");
    cardSection.classList.add("card");

    const cardContent = document.createElement("div");
    cardContent.classList.add("content");

    const cardFront = document.createElement("div");
    cardFront.classList.add("front");

    const cardBack = document.createElement("div");
    cardBack.classList.add("back");

    const emoji = emojis[Math.floor(Math.random() * emojis.length)];

    cardBack.innerHTML = emoji;

    cardSection.appendChild(cardContent);
    cardContent.appendChild(cardFront);
    cardContent.appendChild(cardBack);

    gameBoard.appendChild(cardSection);
  }
}

createBoard();

// const cards2 = document.querySelectorAll(".card");

// const reveal = (e) => {
//   const currentCard = e.currentTarget;
//   currentCard.classList.add("flipped");

//   setTimeout(() => {
//     currentCard.classList.remove("flipped");
//   }, 1000);
// };

// for (const card of cards2) {
//   card.addEventListener("click", reveal);
// }

