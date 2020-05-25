const { prompt } = require('@bottender/proposal-conversation');

const quickReply = require('./quickReply');

module.exports = class Field {
  constructor({ key, name, validator, question, answerOptions }) {
    this.key = key;
    this.name = name;
    this.validator = validator;
    this.question = question;
    this.answerOptions = answerOptions;
  }

  validate(value) {
    return this.validator.test(value);
  }

  async prompt(context) {
    await context.sendText(this.question, quickReply(this.answerOptions));
    return prompt(this.key);
  }
};
