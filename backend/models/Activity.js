const mongoose  = require('mongoose');

const activityschema = new mongoose.Schema ({
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,

    },
    type : {
        type: String,
        required:true,
    },
    duration:{
        type : Number,
        required:true,
    },
    distance:{
        type: Number,
        required:true,
    },
    caloriesBurned:{
        type: Number,
        required:true,
    },
    notes:{
        type:String,
        required:true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
},{
    timestamps : true,

})

module.exports = mongoose.model('Activity',activityschema);