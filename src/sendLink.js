module.exports = async function sendLink(context) {
  const text = '請好友掃描下方 QRCode\n\n或點擊下方 QRCode 選擇好友';
  const bubble = {
    type: 'bubble',
    size: 'giga',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: text,
          wrap: true,
        },
        {
          type: 'image',
          url: 'https://qr-official.line.me/sid/L/313jqfxg.png',
          size: 'full',
          aspectRatio: '1:1',
          aspectMode: 'cover',
          action: {
            type: 'uri',
            uri: 'line://nv/recommendOA/@313jqfxg',
          },
        },
      ],
    },
  };

  await context.sendFlex(text, bubble);
};
