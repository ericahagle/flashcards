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

function createDeck(cards){
  return { cards: cards }
}

function countCards(deck) {
  let cardCount = deck.cards.length;
  return cardCount;
}

function createRound(deck) {
  let round = {
    deck: deck.cards,
    currentCard: deck.cards[0],
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
  round.currentCard = round.deck[round.turns -1];

  return result;
}

function calculatePercentCorrect(round) {
  const result = ((round.deck.length - round.incorrectGuesses.length) / round.deck.length) * 100;
  return result;
}

function endRound(round) {
  const finalMessage = `**Round over!** You answered ${calculatePercentCorrect(round)}% of the questions correctly!`;
  console.log(finalMessage);
  return finalMessage;
}

module.exports = {
  createCard,
  evaluateGuess,
  createDeck,
  countCards,
  createRound,
  takeTurn,
  calculatePercentCorrect,
  endRound
}