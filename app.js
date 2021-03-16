const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// 配置CORS相关
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// 引入body-parser包
app.use(bodyParser.json());

app.use('/rap/summary', require('./routers/word'));

// 错误处理中间件
app.use(function (req, res, next) {
  res.json({ code: 404, err_tip: 'not found', data: null });
});

app.listen(process.env.PORT, () => {
  console.log(`Server start on ${process.env.PORT}...`);
});
