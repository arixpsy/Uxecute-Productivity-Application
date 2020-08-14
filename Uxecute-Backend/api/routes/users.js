const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/users');

router.post('/login', (req, res, next) => {
    let user = req.body;
    //check user is empty or null
    if (user.email == '' || user.email == null || user.password == '' || user.password == null) {
        res.status(200).json({
            error: "email or password empty"
        });
    }

    User.find()
        .where('email', user.email)
        .sort({'position': 1})
        .exec()
        .then(docs => {
            if(docs.length != 0){
                console.log(docs[0])
                if(bcrypt.compareSync(user.password , docs[0].password)){
                    res.status(200).json({
                        name: docs[0].name,
                        email: docs[0].email,
                        country: docs[0].country
                    })
                } else {
                    res.status(200).json({
                        error: "Incorrect email or password"
                    })
                }
            } else {
                res.status(200).json({
                    error: "Incorrect email or password"
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
});

router.post('/', (req, res, next) => { 
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: hash,
            country: req.body.country,
        });

        user.save()
            .then(result => {
                console.log(result)
                res.status(200).json({
                    message: 'Successfully created a user',
                    user: result
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    error: err
                });
            });
    });
});

router.patch('/:email', (req, res, next) => {
    const email = req.params.email;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    User.updateOne({email: email}, { $set: updateOps})
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: `Successfully update a user`,
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router