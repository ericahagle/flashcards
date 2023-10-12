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

function createRound(deck) {
  let round = {
    deck: deck,
    currentCard: deck[0],
    turns: 0,
    incorrectGuesses: []
  }
  return round;
}

function takeTurn(guess, round) {
  const result = evaluateGuess(guess, round.currentCard.correctAnswer);

  if (result === 'incorrect!') {
    round.incorrectGuesses.push(round.currentCard.id);
  }

  round.turns++;

  if (round.turns < round.deck.length) {
    round.currentCard = round.deck[round.turns];
  }
  
  return round;
}

// function calculatePercentCorrect(round) {

// }

// function endRound(round) {

// }

module.exports = {
  createCard,
  evaluateGuess,
  createDeck,
  addCardToDeck,
  countCards,
  createRound,
  takeTurn,
  // calculatePercentCorrect,
  // endRound
}