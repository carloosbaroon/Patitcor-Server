const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');

const Mascotas = require('../models/mascotas');

const mascotaRouter = express.Router();

mascotaRouter.use(bodyParser.json());

mascotaRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Mascotas.find(req.query)
            .then((mascotas) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(mascotas);
            },(err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, (req, res, next)=> {
        Mascotas.create(req.body)
            .then((mascota) => {
                console.log('Mascota Created ', mascota);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(mascota);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(cors.corsWithOptions,(req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /mascotas');
    })
    .delete(cors.corsWithOptions,(req, res, next) => {
        Mascotas.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

mascotaRouter.route('/:mascotaId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Mascotas.findById(req.params.mascotaId)
            .then((mascota) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(mascota);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, (req, res, next)=> {
        res.statusCode = 403;
        res.end('PUT operation not supported on /mascotas/' + req.params.mascotaId);
    })
    .put(cors.corsWithOptions,(req, res, next) => {
        Mascotas.findByIdAndUpdate(req.params.mascotaId, {
            $set: req.body
            //With new: true we get the updated dish
        }, { new: true })
            .then((mascota) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(mascota);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(cors.corsWithOptions,(req, res, next) => {
        Mascotas.findByIdAndRemove(req.params.mascotaId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = mascotaRouter;


