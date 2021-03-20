module.exports.success = (data) => {
  return {
    code: 0,
    err_tips: 'success',
    data: data,
  };
};

module.exports.paramErr = () => {
  return {
    code: 400,
    err_tips: '参数错误',
    data: null,
  };
};

module.exports.systemErr = (err) => {
  return {
    code: 500,
    err_tips: err,
    data: null,
  };
};
