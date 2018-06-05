const { errorHandling, sucessHandling } = require("../tools/util")

async function post(ctx, next) {
  try {
    const { id, openid } = ctx.request.body
    let params = []
    sucessHandling(params, ctx)
  } catch (error) {
    errorHandling(error, ctx)
  }
}

module.exports = {
  post
}

