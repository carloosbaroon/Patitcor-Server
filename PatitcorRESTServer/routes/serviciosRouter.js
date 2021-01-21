const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');

const Servicios = require('../models/servicios');

const servicioRouter = express.Router();

servicioRouter.use(bodyParser.json());

servicioRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Servicios.find(req.query)
            .then((servicio) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(servicio);
            },(err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, (req, res, next)=> {
        Servicios.create(req.body)
            .then((servicio) => {
                console.log('Servicio Created ', servicio);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(servicio);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(cors.corsWithOptions,(req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /servicios');
    })
    .delete(cors.corsWithOptions,(req, res, next) => {
        Servicios.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

servicioRouter.route('/:servicioId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Servicios.findById(req.params.servicioId)
            .then((servicio) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(servicio);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, (req, res, next)=> {
        res.statusCode = 403;
        res.end('POST operation not supported on /servicios/' + req.params.servicioId);
    })
    .put(cors.corsWithOptions,(req, res, next) => {
        Servicios.findByIdAndUpdate(req.params.servicioId, {
            $set: req.body
            //With new: true we get the updated dish
        }, { new: true })
            .then((servicio) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(servicio);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(cors.corsWithOptions,(req, res, next) => {
        Servicios.findByIdAndRemove(req.params.servicioId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = servicioRouter;


