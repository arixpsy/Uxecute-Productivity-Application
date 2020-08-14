const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Task = require('../models/tasks');

router.get('/', (req, res, next) => {
    let user = req.query.user;
    //check user is empty or null
    if (user == '' || user == null) {
        res.status(200).json({
            error: "User param not given"
        });
    }

    Task.find()
        .where('user', user)
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
    const task = new Task({
        _id: new mongoose.Types.ObjectId(),
        description: req.body.description,
        completed: false,
        completed_date: null,
        deadline: req.body.deadline,
        archived: false,
        user: req.body.user
    });

    task.save()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: 'Successfully created a task',
                task: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
    
});

router.patch('/:taskId', (req, res, next) => {
    const id = req.params.taskId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    Task.updateOne({_id: id}, { $set: updateOps})
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: `Successfully update a task`,
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:taskId', (req, res, next) => {
    const id = req.params.taskId;
    Task.deleteOne({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Successfully deleted a task'
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