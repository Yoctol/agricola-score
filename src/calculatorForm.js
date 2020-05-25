const {
  registerAction,
  getAction,
  deleteField,
  prompt,
} = require('@bottender/proposal-conversation');

const resultFlex = require('./resultFlex');
const fields = require('./fields');
const fieldUpdateValidator = /玩家數|田數|柵欄圈地數|小麥數|蔬菜數|羊數|豬數|牛數|空地數|柵欄圈地內馬廄數|房間數|房間類型|人口數|乞討卡|主要發展卡的的總得分|職業卡和次要發展卡的總得分/;

async function calculatorForm(context, props) {
  // update field
  if (props.update) {
    if (fieldUpdateValidator.test(props.update)) {
      const field = fields.find(field => field.name === props.update);
      if (field) {
        props[field.key] = undefined;
        deleteField(context, ['update', field.key]);
      }
    } else {
      // others input
      return getAction('App');
    }
  }

  // validate and prompt for each field
  for (let i = 0; i < fields.length; i++) {
    let field = fields[i];
    if (!field.validate(props[field.key])) {
      return await field.prompt(context);
    }
  }

  // show score
  await context.sendFlex('農家樂分數計算結果：', resultFlex(props));

  // update field
  return prompt('update');
}

registerAction('calculatorForm', calculatorForm);
module.exports = calculatorForm;
