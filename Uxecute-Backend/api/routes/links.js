const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Link = require('../models/links');

router.get('/', (req, res, next) => {
    let user = req.query.user;
    //check user is empty or null
    if (user == '' || user == null) {
        res.status(200).json({
            error: "User param not given"
        });
    }
    Link.find()
        .where('user', user)
        .sort({'position': 1})
        .exec()
        .then(docs => {
            console.log(docs)
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });

});

router.post('/', (req, res, next) => {
    const link = new Link({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        url: req.body.url,
        icon: req.body.icon,
        user: req.body.user,
        position: req.body.position
    });

    link.save()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: 'Successfully created a link',
                link: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
    
});

router.patch('/:linkId', (req, res, next) => {
    const id = req.params.linkId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    Link.updateOne({_id: id}, { $set: updateOps})
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: `Successfully update a link`,
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:linkId', (req, res, next) => {
    const id = req.params.linkId;
    Link.deleteOne({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Successfully deleted a link'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
    
});

module.exports = router