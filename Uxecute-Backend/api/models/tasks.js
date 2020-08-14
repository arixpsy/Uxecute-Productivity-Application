const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    description: String,
    completed: Boolean,
    completed_date: Date,
    deadline: { type: Date, default: Date.now },
    archived: Boolean,
    user: String
});

module.exports = mongoose.model('Task', taskSchema);