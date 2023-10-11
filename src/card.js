function createCard(id, question, answers, correctAnswer) {
  let card = {
    id: id,
    question: question,
    answers: answers,
    correctAnswer: correctAnswer
  }
  return card;
}

function evaluateGuess(guess, correctAnswer) {
  if (guess === correctAnswer) {
    return 'correct!';
  } else {
    return 'incorrect!';
  }
}

function createDeck() {
  let deck = [];
  return deck;
}

function addCardToDeck(deck, card) {
  deck.push(card);
}

function countCards(deck) {
  let cardCount = deck.length;
  return cardCount;
}

module.exports = {
  createCard,
  evaluateGuess,
  createDeck,
  addCardToDeck,
  countCards
}