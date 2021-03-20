const express = require('express');
const WordController = require('../controllers/word');
const router = express.Router();
class WordRouter {
  static initRouter() {
    router.get('/', WordController.getSummary);
    router.get('/get_words', WordController.getWords);
    return router;
  }
}
module.exports = WordRouter.initRouter();
