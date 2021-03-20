let Sequelize = require('sequelize');
let Op = Sequelize.Op;
const WordModel = require('../models/word');
const { paramsInvalid } = require('../utils/common');
const { paramErr, success, systemErr } = require('../utils/response');
const { getWordInfo } = require('../utils/word');
class WordService {
  async getSummary({ word, rap_num, tone_type }) {
    // 参数校验
    if (paramsInvalid([word, rap_num, tone_type])) {
      return paramErr();
    }
    // 为空直接返回
    if (word === '') {
      return success([[], [], [], []]);
    }
    rap_num = parseInt(rap_num);
    tone_type = parseInt(tone_type);
    const result = getWordInfo(word); // 获取处理后的单词拼音
    // 获取最终要押韵的无音调韵母
    let type_without_tone = result.type_without_tone
      .split('-')
      .slice(-rap_num)
      .join('-');
    // 获取最终要押韵的有音调韵母
    const type_with_tone_arr = result.type_with_tone.split('-');
    const num = tone_type > 1 ? rap_num : tone_type;
    let type_with_tone =
      num === 0 ? '' : type_with_tone_arr.slice(-num).join('-');
    // 查数据库
    try {
      // 查询长度为2的词
      const getWordLengthEq2 = new Promise((resolve) => {
        resolve(
          this.getWordsFromModel({
            word,
            type_with_tone,
            type_without_tone,
            length: 2,
            num: 140,
          })
        );
      });
      // 查询长度为3的词
      const getWordLengthEq3 = new Promise((resolve) => {
        resolve(
          this.getWordsFromModel({
            word,
            type_with_tone,
            type_without_tone,
            length: 3,
            num: 100,
          })
        );
      });
      // 查询长度为4的词
      const getWordLengthEq4 = new Promise((resolve) => {
        resolve(
          this.getWordsFromModel({
            word,
            type_with_tone,
            type_without_tone,
            length: 4,
            num: 80,
          })
        );
      });
      // 查询长度大于5的词
      const getWordLengthGte5 = new Promise((resolve) => {
        resolve(
          this.getWordsFromModel({
            word,
            type_with_tone,
            type_without_tone,
            length: 5,
            num: 40,
          })
        );
      });
      const data = await Promise.all([
        getWordLengthEq2,
        getWordLengthEq3,
        getWordLengthEq4,
        getWordLengthGte5,
      ]);
      return success(data);
    } catch (err) {
      return systemErr(err);
    }
  }

  async addWords(words) {
    return WordModel.createBatch(words);
  }

  getWordsFromModel({ word, type_with_tone, type_without_tone, length, num }) {
    return WordModel.findAll({
      where: {
        word: { [Op.ne]: word },
        [Op.or]: [
          { type_without_tone: { [Op.like]: `%-${type_without_tone}` } },
          { type_without_tone: { [Op.eq]: `${type_without_tone}` } },
        ],
        type_with_tone: { [Op.like]: `%${type_with_tone}` },
        length: length > 5 ? { [Op.gte]: length } : { [Op.eq]: length || 2 },
      },
      offset: 0,
      limit: num || 50,
      order: [['rate', 'DESC']],
    });
  }
}

module.exports = new WordService();
