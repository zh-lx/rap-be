// 处理txt并初始化数据库，可无需此文件
const fs = require('fs');
const { handleWord } = require('./handleWord');
const SummaryController = require('../controllers/summary.js');

const handleFile = (file_path) => {
  const data = fs.readFileSync(file_path, 'utf-8');
  const result = [];
  const lines = data.split('\n');
  let i = 0;
  lines.forEach((line) => {
    line = line.replace(/\s+/, ' ');
    const item = line.split(' ');
    result.push(handleWord(item[0], Number(item[1]) || 0));
    console.log(++i);
  });
  SummaryController.addWords(result);
};

handleFile('./data/dict.txt');
// handleFile('./data/THUOCL_animal.txt');
// handleFile('./data/THUOCL_caijing.txt');
// handleFile('./data/THUOCL_car.txt');
// handleFile('./data/THUOCL_chengyu.txt');
// handleFile('./data/THUOCL_place.txt');
// handleFile('./data/THUOCL_food.txt');
// handleFile('./data/THUOCL_it.txt');
// handleFile('./data/THUOCL_law.txt');
// handleFile('./data/THUOCL_lishimingren.txt');
// handleFile('./data/THUOCL_medical.txt');
// handleFile('./data/THUOCL_poem.txt');
