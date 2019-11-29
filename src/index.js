const { chain } = require('bottender');
const { router, text } = require('bottender/router');
const { form, formMiddleware } = require('./form');

const greeting = require('./greeting');
const calculatorStart = require('./calculatorStart');
const calculatorContinue = require('./calculatorContinue');

module.exports = async function App() {
  return chain([
    formMiddleware,
    router([
      {
        predicate: context => {
          const text = context.event.text || context.event.rawEvent.type;
          return text == 'follow' || text == 'join';
        },
        action: greeting,
      },
      text('幫我算分數', calculatorStart), // get request
      form('幫我算分數', calculatorContinue), // post request
      text('*', greeting),
    ]),
  ]);
};
