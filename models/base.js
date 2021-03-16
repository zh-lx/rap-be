let Sequelize = require('sequelize');
const db = require('../config/db.js');
let Op = Sequelize.Op;

class BaseModel {
  constructor(tableName, schema) {
    this.model = db.define(tableName, schema, {
      freezeTableName: true,
      timestamps: false,
    });
  }
  // 返回实例化的sequelize模型实例
  getModel() {
    return this.model;
  }
}
module.exports = BaseModel;
