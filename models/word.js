let Sequelize = require('sequelize');
const BaseModel = require('./base.js');
let Op = Sequelize.Op;
class WordModel extends BaseModel {
  constructor() {
    super('summary', {
      word: { type: Sequelize.STRING },
      rate: { type: Sequelize.INTEGER },
      initial: { type: Sequelize.STRING },
      final_with_tone: { type: Sequelize.STRING },
      final_without_tone: { type: Sequelize.STRING },
      type_with_tone: { type: Sequelize.STRING },
      type_without_tone: { type: Sequelize.STRING },
      length: { type: Sequelize.INTEGER },
    });
    this.model = super.getModel();
    this.model.sync();
  }
  findAll(options) {
    return this.model.findAll(options);
  }
  createBatch(data) {
    return this.model.bulkCreate(data);
  }
}
module.exports = new WordModel();
