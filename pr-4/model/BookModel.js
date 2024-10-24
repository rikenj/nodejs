const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    pages : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    }
})

const book = mongoose.model("book",userSchema);
module.exports = book