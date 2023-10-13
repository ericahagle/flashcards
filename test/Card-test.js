const chai = require('chai');
const expect = chai.expect;

const { createCard, evaluateGuess, createDeck, countCards, createRound, takeTurn, calculatePercentCorrect, endRound } = require('../src/card');

describe('cards', function() {
  describe('card creation', function() {
    it('should be a function', function() {
      expect(createCard).to.be.a('function');
    });
  
    it('should create a card and its properties', function() {
      const card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
      
      expect(card.id).to.equal(1);
      expect(card.question).to.equal('What allows you to define a set of related information using key-value pairs?');
      expect(card.answers).to.deep.equal(['object', 'array', 'function']);
      expect(card.correctAnswer).to.equal('object');
    });  
  });
  
  describe('guess evaluation', function() {
    it('should be a function', function() {
      expect(evaluateGuess).to.be.a('function');
    });

    it('should return "incorrect!" if the answer is incorrect', function() {
      const card = createCard(2, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
      const guess = 'pug';
      expect(evaluateGuess(guess, card.correctAnswer)).to.deep.equal('incorrect!');
    });

    it('should return "correct!" if the answer is correct', function() {
      const card = createCard(2, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
      const guess = 'sea otter';
      expect(evaluateGuess(guess, card.correctAnswer)).to.deep.equal('correct!');
    });
  });

  describe('deck creation', function() {
    it('should create a deck and add cards to that deck', function() {
      const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
      const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
      const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');

      const deck = createDeck([card1, card2, card3]);
    
      expect(deck).to.deep.equal({
        cards: [
          {
            id: 1,
            question: "What is Robbie's favorite animal",
            answers: [ 'sea otter', 'pug', 'capybara' ],
            correctAnswer: 'sea otter'
          },
          {
            id: 14,
            question: 'What organ is Khalid missing?',
            answers: [ 'spleen', 'appendix', 'gallbladder' ],
            correctAnswer: 'gallbladder'
          },
          {
            id: 12,
            question: "What is Travis's middle name?",
            answers: [ 'Lex', 'William', 'Fitzgerald' ],
            correctAnswer: 'Fitzgerald'
        }]});
    });

    it('should know how many cards are in the deck', function() {
      const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
      const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
      const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');

      const deck = createDeck([card1, card2, card3]);
      expect(countCards(deck)).to.deep.equal(3);
    });
  });

  describe('rounds', function() {
    it('should create a round', function() {
      const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
      const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
      const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');

      const deck = createDeck([card1, card2, card3]);

      const round = createRound(deck);

      expect(round.deck).to.deep.equal([card1, card2, card3]);
      expect(round.currentCard).to.deep.equal({
        id: 1,
        question: "What is Robbie's favorite animal",
        answers: ['sea otter', 'pug', 'capybara'],
        correctAnswer: 'sea otter'
      });
      expect(round.turns).to.deep.equal(0);
      expect(round.incorrectGuesses).to.deep.equal([]);
    });

    it('should take a turn and add to incorrect guesses if the guess is wrong', function() {
      const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
      const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
      const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');

      const deck = createDeck([card1, card2, card3]);
      const round = createRound(deck);
      const guess = 'sea otter';
      const guess2 = 'spleen';
      const guess3 = 'Lex';
    
      expect(takeTurn(guess, round)).to.deep.equal('correct!');
      expect(round.turns).to.deep.equal(1);
      expect(round.incorrectGuesses).to.deep.equal([]);
      expect(round.currentCard).to.deep.equal({
        id: 1,
        question: "What is Robbie's favorite animal",
        answers: ['sea otter', 'pug', 'capybara'],
        correctAnswer: 'sea otter'
      });

      expect(takeTurn(guess2, round)).to.deep.equal('incorrect!');
      expect(round.turns).to.deep.equal(2);
      expect(round.incorrectGuesses).to.deep.equal([14]);
      expect(round.currentCard).to.deep.equal({
        id: 14,
        question: 'What organ is Khalid missing?',
        answers: [ 'spleen', 'appendix', 'gallbladder' ],
        correctAnswer: 'gallbladder'
      });

      expect(takeTurn(guess3, round)).to.deep.equal('incorrect!');
      expect(round.turns).to.deep.equal(3);
      expect(round.incorrectGuesses).to.deep.equal([14, 12]);
      expect(round.currentCard).to.deep.equal(undefined);
  });

    it('should calculate and return the percentage of correct guesses', function() {
      const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
      const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
      const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
      const card4 = createCard(3, 'What is Travis\'s favorite stress reliever?', ['listening to music', 'watching Netflix', 'playing with bubble wrap'], 'playing with bubble wrap');

      const deck = createDeck([card1, card2, card3, card4]);

      const round = createRound(deck);

      const guess = 'sea otter';
      takeTurn(guess, round);
      expect(calculatePercentCorrect(round)).to.deep.equal(0);

      const guess2 = 'spleen';
      takeTurn(guess2, round);
      expect(calculatePercentCorrect(round)).to.deep.equal(50);

      const guess3 = 'Lex';
      takeTurn(guess3, round);
      expect(calculatePercentCorrect(round)).to.deep.equal(66.66666666666666);

      const guess4 = 'playing with bubble wrap';
      takeTurn(guess4, round);
      expect(calculatePercentCorrect(round)).to.deep.equal(50);
    });
    
    it('should let the player know that the round has ended', function() {
      const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
      const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
      const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
      const card4 = createCard(3, 'What is Travis\'s favorite stress reliever?', ['listening to music', 'watching Netflix', 'playing with bubble wrap'], 'playing with bubble wrap');

      const deck = createDeck([card1, card2, card3, card4]);

      const round = createRound(deck);

      const guess = 'sea otter';
      takeTurn(guess, round);
      calculatePercentCorrect(round);
      expect(endRound(round)).to.deep.equal('**Round over!** You answered 100% of the questions correctly!');

      const guess2 = 'spleen';
      takeTurn(guess2, round);
      calculatePercentCorrect(round);
      expect(endRound(round)).to.deep.equal('**Round over!** You answered 50% of the questions correctly!');

      const guess3 = 'Lex';
      takeTurn(guess3, round);
      calculatePercentCorrect(round);
      expect(endRound(round)).to.deep.equal('**Round over!** You answered 33.33333333333334% of the questions correctly!');

      const guess4 = 'playing with bubble wrap';
      takeTurn(guess4, round);
      calculatePercentCorrect(round);
      expect(endRound(round)).to.deep.equal('**Round over!** You answered 50% of the questions correctly!');
    });
  });
});
