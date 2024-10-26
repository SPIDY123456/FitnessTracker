const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name :{
        type: String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type: String,
        required:true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'], 
        required: true,
    },
    passion:{
        type:String,
        required:true,
    },
    weight: {
        type:Number,
        required:true,
    },
    height:{
        type:Number,
        required:true,
    },
    profilePicture:{
        type: String,
        required:true,
    },


    goals:[{type:mongoose.Schema.Types.ObjectId, ref: 'Goal'}],
    activities:[{type:mongoose.Schema.Types.ObjectId, ref:'Activity'}],
},{

timestamps: true,


});

module.exports = mongoose.model('User', userSchema);