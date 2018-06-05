//引包
const mongoose = require('mongoose');
const glob = require('glob')

const { resolve } = require('path')

const url = "mongodb://127.0.0.1:27017/smileVue"
//连接数据库，数据库叫做/smileVue。如果数据库不存在会自动创建。
let maxConnectTimes = 0

exports.initSchemas = (() => {
  glob.sync(resolve(__dirname, "./schema", "**/*.js")).forEach(require)
})

exports.connect = () => {
  mongoose.connect(url);
    return new Promise((resolve, reject) => {

      mongoose.connection.on('disconnected', (err) => {
        if (maxConnectTimes <= 3) {
          console.log('****************************** 数据库断开  ******************************')
          mongoose.connect(url);
          maxConnectTimes++
        } else {
          reject(err)
          throw new Error("****************************** 数据库出错 ******************************")
        }

      });

      mongoose.connection.on('error', (err) => {
        if (maxConnectTimes <= 3) {
          console.log('****************************** 数据库出错  ******************************')
          mongoose.connect(url);
          maxConnectTimes++
        } else {
          reject(err)
          throw new Error("****************************** 数据库出错 ******************************")
        }
      });
      mongoose.connection.on('open', (callback) => {
        resolve()
        console.log(' ****************************** db service connected. ******************************')
      });
    })

}


