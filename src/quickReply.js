const { isArray } = require('lodash');

function toTextAction(text) {
  return {
    type: 'action',
    action: {
      type: 'message',
      label: text,
      text: text,
    },
  };
}

module.exports = function quickReply(textOrTexts) {
  let texts = textOrTexts;
  if (!isArray(texts)) {
    texts = [texts];
  }

  return {
    quickReply: {
      items: texts.map(toTextAction),
    },
  };
};
