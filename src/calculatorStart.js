require('./calculatorForm');
const { getAction } = require('@bottender/proposal-conversation');

module.exports = async function calculatorStart(context) {
  await context.sendText('請填寫以下資訊：');
  return getAction('calculatorForm');
};
