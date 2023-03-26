const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    phoneno:{
        type:Number
    },
    password:{
        type:String
    }
})

module.exports = mongoose.model("User",UserSchema)