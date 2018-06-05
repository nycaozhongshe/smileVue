const { errorHandling, sucessHandling, mongosql } = require("../tools/util")

async function post(ctx, next) {
  try {

    //get
    const { userName, password } = ctx.query
    //post
    // const { userName, password  } = ctx.request.body
    console.log(userName, password, "***********************************************************")
    await mongosql("user").create(
      {
        userName,
        password
      }
    )
    sucessHandling(ctx, {})
  } catch (error) {
    console.log(error)
    errorHandling(ctx, error)
  }
}

module.exports = {
  post
}

