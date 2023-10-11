const chai = require('chai');
const expect = chai.expect;

const { createCard, evaluateGuess, createDeck, addCardToDeck, countCards } = require('../src/card');

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
});
