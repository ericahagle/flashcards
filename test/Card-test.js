const chai = require('chai');
const expect = chai.expect;

const { createCard, evaluateGuess } = require('../src/card');

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
});
