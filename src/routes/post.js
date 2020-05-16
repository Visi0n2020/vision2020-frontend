const express = require('express')
const List = require('../models/list')
const checkAuth = require("../middleware/check-auth");

const router = express.Router();


router.post( "/lists", checkAuth, (req, res, next) => {
    const post = new List({
    title: req.body.title,
    creator: req.userData.userId
    });
    post
    .save()
    .then(createdPost => {
        res.status(201).json({
        message: "List added successfully",
        post: {
            ...createdPost,
            id: createdPost._id
        }
        });
    })
    .catch(error => {
        res.status(500).json({
        message: "Creating a List failed!"
        });
    });
}
);

module.exports = router;