const { prompt } = require('./form');
const quickReply = require('./quickReply');

const nameToKey = {
  田數: 'field',
  柵欄圈數: 'pasture',
  小麥數: 'grain',
  蔬菜數: 'vegetable',
  羊數: 'sheep',
  豬數: 'wildBoar',
  牛數: 'cattle',
  空地數: 'emptyFarmyard',
  柵欄圈內馬廄數: 'fencedStable',
  房間數: 'room',
  房間類型: 'roomStyle',
  人口數: 'family',
  乞討卡: 'beggingCard',
  主要發展卡的的總得分: 'bonus',
  職業卡和次要發展卡的總得分: 'otherBonus',
};

const keyToName = {
  field: '田數',
  pasture: '柵欄圈數',
  grain: '小麥數',
  vegetable: '蔬菜數',
  sheep: '羊數',
  wildBoar: '豬數',
  cattle: '牛數',
  emptyFarmyard: '空地數',
  fencedStable: '柵欄圈內馬廄數',
  room: '房間數',
  roomStyle: '房間類型',
  family: '人口數',
  beggingCard: '乞討卡',
  bonus: '主要發展卡的的總得分',
  otherBonus: '職業卡和次要發展卡的總得分',
};

const scoreTable = {
  field: [
    -1,
    -1,
    1,
    2,
    3,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
  ],
  pasture: [
    -1,
    1,
    2,
    3,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
  ],
  grain: [
    -1,
    1,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
  ],
  vegetable: [
    -1,
    1,
    2,
    3,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
  ],
  sheep: [
    -1,
    1,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
  ],
  wildBoar: [
    -1,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
  ],
  cattle: [
    -1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
  ],
  emptyFarmyard: [
    0,
    -1,
    -2,
    -3,
    -4,
    -5,
    -6,
    -7,
    -8,
    -9,
    -10,
    -11,
    -12,
    -13,
    -14,
    -15,
  ],
  fencedStable: [0, 1, 2, 3, 4],
  room草屋: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  room磚屋: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  room石屋: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
  family: [0, 3, 6, 9, 12, 15],
};

module.exports = async function calculatorContinue(context) {
  const edit = context.state.form.params.edit;
  // field reset
  if (edit != null) {
    context.state.form.params[nameToKey[edit]] = null;
    context.state.form.params.edit = null;
  }

  const field = context.state.form.params.field;
  if (field == null) {
    prompt(context, {
      path: '幫我算分數',
      param: 'field',
      validateRegex: /^\d{1,2}$/,
    });
    await context.sendText(
      '您耕了幾片田?',
      quickReply(['0', '1', '2', '3', '4', '5'])
    );
    return;
  }

  const pasture = context.state.form.params.pasture;
  if (pasture == null) {
    prompt(context, {
      path: '幫我算分數',
      param: 'pasture',
      validateRegex: /^\d{1}$/,
    });
    await context.sendText(
      '您蓋出幾圈柵欄圈?',
      quickReply(['0', '1', '2', '3', '4', '5'])
    );
    return;
  }

  const grain = context.state.form.params.grain;
  if (grain == null) {
    prompt(context, {
      path: '幫我算分數',
      param: 'grain',
      validateRegex: /^\d{1,2}$/,
    });
    await context.sendText(
      '您有幾個小麥?(手上的以及田裡的)',
      quickReply(['0', '1', '2', '3', '4', '5', '6', '7', '8'])
    );
    return;
  }

  const vegetable = context.state.form.params.vegetable;
  if (vegetable == null) {
    prompt(context, {
      path: '幫我算分數',
      param: 'vegetable',
      validateRegex: /^\d{1,2}$/,
    });
    await context.sendText(
      '您有幾個蔬菜?(手上的以及田裡的)',
      quickReply(['0', '1', '2', '3', '4'])
    );
    return;
  }

  const sheep = context.state.form.params.sheep;
  if (sheep == null) {
    prompt(context, {
      path: '幫我算分數',
      param: 'sheep',
      validateRegex: /^\d{1,2}$/,
    });
    await context.sendText(
      '您養了幾頭羊?',
      quickReply(['0', '1', '2', '3', '4', '5', '6', '7', '8'])
    );
    return;
  }

  const wildBoar = context.state.form.params.wildBoar;
  if (wildBoar == null) {
    prompt(context, {
      path: '幫我算分數',
      param: 'wildBoar',
      validateRegex: /^\d{1,2}$/,
    });
    await context.sendText(
      '您養了幾頭豬?',
      quickReply(['0', '1', '2', '3', '4', '5', '6', '7'])
    );
    return;
  }

  const cattle = context.state.form.params.cattle;
  if (cattle == null) {
    prompt(context, {
      path: '幫我算分數',
      param: 'cattle',
      validateRegex: /^\d{1,2}$/,
    });
    await context.sendText(
      '您養了幾頭牛?',
      quickReply(['0', '1', '2', '3', '4', '5', '6'])
    );
    return;
  }

  const emptyFarmyard = context.state.form.params.emptyFarmyard;
  if (emptyFarmyard == null) {
    prompt(context, {
      path: '幫我算分數',
      param: 'emptyFarmyard',
      validateRegex: /^\d{1,2}$/,
    });
    await context.sendText(
      '您有幾片未使用的空地?',
      quickReply([
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
      ])
    );
    return;
  }

  const fencedStable = context.state.form.params.fencedStable;
  if (fencedStable == null) {
    prompt(context, {
      path: '幫我算分數',
      param: 'fencedStable',
      validateRegex: /^[01234]$/,
    });
    await context.sendText(
      '您蓋了幾間在柵欄圈內的馬廄?',
      quickReply(['0', '1', '2', '3', '4'])
    );
    return;
  }

  const roomStyle = context.state.form.params.roomStyle;
  if (roomStyle == null) {
    prompt(context, {
      path: '幫我算分數',
      param: 'roomStyle',
      validateRegex: /(草|磚|石)屋/,
    });
    await context.sendText(
      '您住在哪種房子? (草屋, 磚屋, 石屋)',
      quickReply(['草屋', '磚屋', '石屋'])
    );
    return;
  }

  const room = context.state.form.params.room;
  if (room == null) {
    prompt(context, {
      path: '幫我算分數',
      param: 'room',
      validateRegex: /^\d{1}$/,
    });
    await context.sendText('您蓋了幾間房間?', quickReply(['2', '3', '4', '5']));
    return;
  }

  const family = context.state.form.params.family;
  if (family == null) {
    prompt(context, {
      path: '幫我算分數',
      param: 'family',
      validateRegex: /^[2345]$/,
    });
    await context.sendText('您家有幾個人?', quickReply(['2', '3', '4', '5']));
    return;
  }

  const beggingCard = context.state.form.params.beggingCard;
  if (beggingCard == null) {
    prompt(context, {
      path: '幫我算分數',
      param: 'beggingCard',
      validateRegex: /^\d{1,2}$/,
    });
    await context.sendText(
      '您拿到幾張乞討卡?',
      quickReply([
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
      ])
    );
    return;
  }

  const bonus = context.state.form.params.bonus;
  if (bonus == null) {
    prompt(context, {
      path: '幫我算分數',
      param: 'bonus',
      validateRegex: /^\d{1,2}$/,
    });
    await context.sendText(
      '您在主要發展卡上的總得分是?',
      quickReply([
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
      ])
    );
    return;
  }

  const otherBonus = context.state.form.params.otherBonus;
  if (otherBonus == null) {
    prompt(context, {
      path: '幫我算分數',
      param: 'otherBonus',
      validateRegex: /^\d{1,2}$/,
    });
    await context.sendText(
      '您在職業卡和次要發展卡上的總得分是?',
      quickReply([
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
      ])
    );
    return;
  }

  prompt(context, {
    path: '幫我算分數',
    param: 'edit',
    validateRegex: /玩家數|田數|柵欄圈數|小麥數|蔬菜數|羊數|豬數|牛數|空地數|柵欄內馬廄數|房間數|房間類型|人口數|乞討卡|主要發展卡的的總得分|職業卡和次要發展卡的總得分/,
  });
  await context.sendFlex(
    '農家樂分數計算結果：',
    resultFlex(context.state.form.params)
  );
};

function calculate(params) {
  let score = 0;
  [
    'field',
    'pasture',
    'grain',
    'vegetable',
    'sheep',
    'wildBoar',
    'cattle',
    'emptyFarmyard',
    'fencedStable',
    'family',
  ].forEach(key => {
    score += scoreTable[key][params[key]];
  });

  score += scoreTable[`room${params.roomStyle}`][params.room];
  score += Number(params.beggingCard) * -3;
  score += Number(params.bonus) + Number(params.otherBonus);
  return score;
}

function textButton(label, text) {
  return {
    type: 'text',
    text: label,
    action: {
      type: 'message',
      text: text,
    },
    color: '#225588',
    margin: 'md',
  };
}

function resultFlex(params) {
  const bubbleContents = [
    {
      type: 'box',
      layout: 'horizontal',
      margin: 'lg',
      contents: [
        {
          type: 'text',
          text: '以下是您所輸入的資料：',
          weight: 'bold',
          flex: 0,
        },
        textButton('全部重填', '幫我算分數'),
      ],
    },
  ];

  // 各項資源數量
  [
    'field',
    'pasture',
    'grain',
    'vegetable',
    'sheep',
    'wildBoar',
    'cattle',
    'emptyFarmyard',
    'fencedStable',
    'room',
    'roomStyle',
    'family',
    'beggingCard',
    'bonus',
    'otherBonus',
  ].forEach(key => {
    const name = keyToName[key];
    bubbleContents.push({
      type: 'box',
      layout: 'horizontal',
      margin: 'lg',
      contents: [
        {
          type: 'text',
          text: `${name}: ${params[key]}`,
          size: 'sm',
          flex: 0,
        },
        textButton('修改', name),
      ],
    });
  });

  bubbleContents.push({
    type: 'separator',
  });

  bubbleContents.push({
    type: 'text',
    text: `總分：${calculate(params)}`,
    size: 'xxl',
    weight: 'bold',
    margin: 'lg',
  });

  return {
    type: 'bubble',
    size: 'giga',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: bubbleContents,
    },
  };
}
