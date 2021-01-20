const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');

const Productos = require('../models/productos');

const productoRouter = express.Router();

productoRouter.use(bodyParser.json());

productoRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Productos.find(req.query)
            .then((productos) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(productos);
            },(err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, (req, res, next)=> {
        Productos.create(req.body)
            .then((productos) => {
                console.log('Producto Created ', productos);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(productos);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(cors.corsWithOptions,(req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /productos');
    })
    .delete(cors.corsWithOptions,(req, res, next) => {
        Productos.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

productoRouter.route('/:productoId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Productos.findById(req.params.productoId)
            .then((producto) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(producto);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, (req, res, next)=> {
        res.statusCode = 403;
        res.end('POST operation not supported on /productos/' + req.params.productoId);
    })
    .put(cors.corsWithOptions,(req, res, next) => {
        Productos.findByIdAndUpdate(req.params.productoId, {
            $set: req.body
            //With new: true we get the updated dish
        }, { new: true })
            .then((producto) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(producto);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(cors.corsWithOptions,(req, res, next) => {
        Productos.findByIdAndRemove(req.params.productoId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = productoRouter;


