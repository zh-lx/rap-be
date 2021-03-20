const WordService = require('../service/word');
class WordController {
  async getSummary(req, res, next) {
    let { word, rap_num, tone_type } = req.query;
    const data = await WordService.getSummary({ word, rap_num, tone_type });
    res.json(data);
  }

  async getWords(req, res, next) {
    let { word, rap_num, tone_type, length } = req.query;
    const data = await WordService.getWords({
      word,
      rap_num,
      tone_type,
      length,
    });
    res.json(data);
  }
}
module.exports = new WordController();
