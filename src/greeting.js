function button(text) {
  return {
    type: 'button',
    action: {
      type: 'message',
      label: text,
      text: text,
    },
    style: 'primary',
    color: '#225588',
    margin: 'md',
  };
}

module.exports = async function menu(context) {
  const text = '歡迎來到農家樂分數計算機，請點擊按鈕開始算分數：';
  const bubble = {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: text,
          wrap: true,
        },
        button('幫我算分數'),
      ],
    },
  };
  await context.sendFlex(text, bubble);
};
