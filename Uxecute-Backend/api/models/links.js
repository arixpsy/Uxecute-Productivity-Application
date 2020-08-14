const mongoose = require('mongoose');

const linkSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    url: String,
    icon: String,
    user: String,
    position: Number
});

module.exports = mongoose.model('Link', linkSchema);