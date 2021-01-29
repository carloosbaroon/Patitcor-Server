const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creating the schema for servicios
const servicioSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: true
    },
    imagen1: {
        type: String,
        required: true
    },
    imagen2: {
        type: String,
        required: true
    },
    imagen3: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

var Servicios = mongoose.model('Servicio', servicioSchema);

module.exports = Servicios;