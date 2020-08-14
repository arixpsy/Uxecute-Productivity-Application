const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()

const linkRoutes = require('./api/routes/links');
const taskRoutes = require('./api/routes/tasks');
const userRoutes = require('./api/routes/users');

// Replace with your own Mongo DB connection string
const MONGODB_CONNECTION = process.env.mongoDB_connection;

mongoose.connect(MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Morgan for Logging
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Handle CORS Errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PATCH, POST, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Routes to handle
app.use('/links', linkRoutes);
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

// Handle invalid url
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

//Handle all errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;