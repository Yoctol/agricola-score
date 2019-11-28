const calculatorContinue = require('./calculatorContinue');

module.exports = async function calculatorStart(context) {
  await context.sendText('請填寫以下資訊：');
  context.state.form.params = {};
  return calculatorContinue;
};
