const express = require('express');
const multer = require("multer");

const imagesRouter = express.Router();

const storage = multer.diskStorage({
    destination: "./public/images/",
    filename: function(req, file, cb){
        cb(null,file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits:{fileSize: 2500000},
}).single("myImage");

imagesRouter.post('/', function (req, res) {
    upload(req, res, function (err) {
        console.log("Request file ---", req.file);//Here you get file.
        /*Now do where ever you want to do*/
        if(!err) {
            return res.send(200).end();
        }
    })
})

module.exports = imagesRouter;