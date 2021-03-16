const { pinyin } = require('pinyin-pro');
const { initial_list, final_list } = require('../data/pinyin');

module.exports.getWordInfo = (word = '', rate = 0) => {
  const length = word.length;
  const initial_arr = pinyin(word, { type: 'array', pattern: 'initial' }); // 声母
  const final_with_tone_arr = pinyin(word, { type: 'array', pattern: 'final' }); // 带拼音韵母
  const final_without_tone_arr = pinyin(word, {
    type: 'array',
    toneType: 'none',
    pattern: 'final',
  }); // 不带拼音韵母
  const tone_arr = pinyin(word, { type: 'array', toneType: 'num' }); // 音调列表
  let type_with_tone_arr = [];
  let type_without_tone_arr = [];
  for (let index = 0; index < length; index++) {
    let type_with_tone, type_without_tone;
    // 对每个字遍历
    for (let typeIndex = 0; typeIndex < final_list.length; typeIndex++) {
      // 对final列表遍历
      let currentFinal = final_list[typeIndex];
      if (currentFinal.includes(final_without_tone_arr[index])) {
        // 五支和七齐
        if (typeIndex === 4 && initial_list[1].includes(initial_arr[index])) {
          type_with_tone = `7.${tone_arr[index]}`;
          type_without_tone = '7';
        } else {
          type_with_tone = `${typeIndex + 1}.${tone_arr[index]}`;
          type_without_tone = typeIndex + 1;
        }
        break;
      }
    }
    type_with_tone_arr.push(type_with_tone);
    type_without_tone_arr.push(type_without_tone);
  }
  return {
    word,
    rate,
    length,
    initial: initial_arr instanceof Array ? initial_arr.join('-') : '',
    final_with_tone:
      final_with_tone_arr instanceof Array ? final_with_tone_arr.join('-') : '',
    final_without_tone:
      final_without_tone_arr instanceof Array
        ? final_without_tone_arr.join('-')
        : '',
    type_with_tone: type_with_tone_arr.join('-'),
    type_without_tone: type_without_tone_arr.join('-'),
  };
};
