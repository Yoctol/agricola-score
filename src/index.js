const { router, text } = require('bottender/router');

const greeting = require('./greeting');
const calculatorStart = require('./calculatorStart');
const sendLink = require('./sendLink');

module.exports = async function App() {
  return router([
    {
      predicate: context => {
        const text = context.event.text || context.event.rawEvent.type;
        return text == 'follow' || text == 'join';
      },
      action: greeting,
    },
    text('推薦給好友', sendLink),
    text('幫我算分數', calculatorStart),
    text('*', greeting),
  ]);
};
