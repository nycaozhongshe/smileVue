const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
//强度
const SALA_WORK_FACTOR = 10

let ObjectId = Schema.Types.ObjectId


//unique 唯一
const userSchema = new Schema({
  userId: ObjectId,
  userName: { unique: true, type: String, required: true },
  password: { type: String, required: true },
  createAt: { type: Date, default: Date.now() },
  lastLoginAt: { type: Date, default: Date.now() }
})

//密码加密
userSchema.pre("save", function (next) {

  bcrypt.genSalt(SALA_WORK_FACTOR, (err, salt) => {

    if (err) return next(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

mongoose.model("user", userSchema, "user")

