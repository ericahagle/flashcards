const chai = require('chai');
const expect = chai.expect;

const { createCard, evaluateGuess, createDeck, addCardToDeck, countCards, createRound, takeTurn, calculatePercentCorrect, endRound } = require('../src/card');

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
    it('should create an empty deck', function() {
      const deck = createDeck();
      expect(deck).to.deep.equal([]);
    });

    it('should add cards to a deck', function() {
      const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
      const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
      const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');

      const deck = createDeck();

      addCardToDeck(deck, card1);
      expect(deck).to.deep.equal([{
        id: 1,
        question: "What is Robbie's favorite animal",
        answers: [ 'sea otter', 'pug', 'capybara' ],
        correctAnswer: 'sea otter'
      }]);

      addCardToDeck(deck, card2);
      expect(deck).to.deep.equal([{
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
      }]);
      addCardToDeck(deck, card3);

      expect(deck).to.deep.equal([{
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
      }]);
    });

    it('should know how many cards are in the deck', function() {
      const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
      const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
      const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');

      const deck = createDeck();

      addCardToDeck(deck, card1);
      expect(countCards(deck)).to.deep.equal(1);

      addCardToDeck(deck, card2);
      expect(countCards(deck)).to.deep.equal(2);

      addCardToDeck(deck, card3);
      expect(countCards(deck)).to.deep.equal(3);
    });
  });

  describe('rounds', function() {
    it('should create a round', function() {
      const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
      const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
      const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');

      const deck = createDeck();

      addCardToDeck(deck, card1);
      addCardToDeck(deck, card2);
      addCardToDeck(deck, card3);

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

      const deck = createDeck();

      addCardToDeck(deck, card1);
      addCardToDeck(deck, card2);
      addCardToDeck(deck, card3);

      const round = createRound(deck);

      const guess = 'sea otter';
      expect(takeTurn(guess, round)).to.deep.equal({
        deck: [card1, card2, card3],
        currentCard: {
          id: 14,
          question: "What organ is Khalid missing?",
          answers: [ 'spleen', 'appendix', 'gallbladder' ],
          correctAnswer: 'gallbladder'
        },
        turns: 1,
        incorrectGuesses: []
      });

      const guess2 = 'spleen';
      expect(takeTurn(guess2, round)).to.deep.equal({
        deck: [card1, card2, card3],
        currentCard: {
          id: 12,
          question: "What is Travis's middle name?",
          answers: ['Lex', 'William', 'Fitzgerald'],
          correctAnswer: 'Fitzgerald'
        },
        turns: 2,
        incorrectGuesses: [14]
      });

      const guess3 = 'Lex';
      expect(takeTurn(guess3, round)).to.deep.equal({
        deck: [card1, card2, card3],
        currentCard: null,
        turns: 3,
        incorrectGuesses: [14, 12]
      });
    });

    it('should calculate and return the percentage of correct guesses', function() {
      const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
      const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
      const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
      const card4 = createCard(3, 'What is Travis\'s favorite stress reliever?', ['listening to music', 'watching Netflix', 'playing with bubble wrap'], 'playing with bubble wrap');

      const deck = createDeck();

      addCardToDeck(deck, card1);
      addCardToDeck(deck, card2);
      addCardToDeck(deck, card3);
      addCardToDeck(deck, card4);

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
  });
});
