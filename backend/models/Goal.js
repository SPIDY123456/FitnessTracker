const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    target: {
        type: Number,
        required: true,
    },
    progress: {
        type: Number,
        default: 0,
    },
    notes:{
        type: String,
        required:true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Goal', goalSchema);

