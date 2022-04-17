/**
 * User模型
 */
const mongoose = require("mongoose")
// 实例化schema
const Schema = mongoose.Schema

// 创建Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    defaultAddr: {
        type: Object
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model("users", UserSchema)