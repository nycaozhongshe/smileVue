//错误处理
function errorHandling(msg, ctx) {
    ctx.state = {
        code: -1,
        data: {
            msg: msg.sqlMessage||msg
        }
    }
}
function sucessHandling(data, ctx) {
    ctx.state = {
        code: 0,
        data: {
            msg: "sucess",
            data:data||[]
        }
    }
}
module.exports = {
    errorHandling,
    sucessHandling
}
