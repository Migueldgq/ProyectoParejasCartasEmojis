const emojis = ["🎃", "👻", "🦇", "👿", "🧛‍♀️", "🧟", "💀 ", "🕸️"];
let cards = [...emojis, ...emojis];
let ArrayCards = [];
let ArrayEmojis = [];
let fails = 0;
let win = 0;
let cardsFlipped = 0;
let canFlip = true;

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

    cardBack.innerHTML = cards[i];

    cardSection.appendChild(cardContent);
    cardContent.appendChild(cardFront);
    cardContent.appendChild(cardBack);

    gameBoard.appendChild(cardSection);
  }
}

createBoard();

gameBoard.addEventListener("click", (e) => {
  if (!canFlip) {
    return; // Si no se pueden voltear cartas, sale del evento de clic
  }

  let value = e.target.classList.contains("front");
  if (value && cardsFlipped < 2) {
    // Verifica si no se han levantado ya dos cartas
    const currentCard = e.target.parentElement;
    let emoji = currentCard.children[1].innerHTML;
    currentCard.classList.add("flipped");
    ArrayCards = [...ArrayCards, currentCard];
    ArrayEmojis = [...ArrayEmojis, emoji];
    cardsFlipped++; // Incrementa el contador de cartas levantadas
    matchCardsVerification();
  }
});

const matchCardsVerification = () => {
  audio.play();
  if (ArrayCards.length === 2) {
    if (ArrayEmojis[0] === ArrayEmojis[1]) {
      ArrayCards = [];
      ArrayEmojis = [];
      win++;
    } else {
      canFlip = false; // Desactiva los eventos de clic mientras se hacen las comprobaciones
      setTimeout(() => {
        ArrayCards[0].classList.remove("flipped");
        ArrayCards[1].classList.remove("flipped");
        ArrayCards = [];
        ArrayEmojis = [];
        canFlip = true; // Vuelve a activar los eventos de clic después de volver a ocultar las cartas
      }, 350);
    }
    cardsFlipped = 0; // Reinicia el contador de cartas levantadas
  }

  if (ArrayCards.length === 2) {
    fails++;
  }
  document.getElementById("fails").innerText = `Fallos: ${fails}`;

  document.getElementById("fin").innerText = ` Aciertos: ${win}`;
  if (win === emojis.length) {
    audioAplausos.play();
    document.getElementById(
      "animationEnd"
    ).innerText = `🎉¡Juego completado! en ${fails} fallos🎉`;
    document.getElementById("fails").innerText = "";
    document.getElementById("fin").innerText = "";
    document.getElementById("contenedorBoton").style.display = "flex";
  }
};
