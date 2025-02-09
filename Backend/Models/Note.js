const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const NoteModel = mongoose.model('notes', NoteSchema);
module.exports = NoteModel;