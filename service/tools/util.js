const mongoose = require('mongoose')

//错误处理
function errorHandling(ctx,msg ) {
  ctx.state = {
    code: -1,
    data: {
      msg: msg.sqlMessage || msg
    }
  }
}
function sucessHandling(ctx, data,msg) {
  ctx.state = {
    code: 0,
    data: {
      msg: msg||"sucess",
      data: data || []
    }
  }
}
//
function mongosql(name) {
  return mongoose.model(name)
}
module.exports = {
  errorHandling,
  sucessHandling,
  mongosql
}
