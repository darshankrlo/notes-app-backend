const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    tags: {
        type: [String],
        default: []
    },
    images: {
        type: [String],
        default: []
    },
    isLocked: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("Note", noteSchema);