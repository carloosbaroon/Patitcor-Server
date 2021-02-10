const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);


//Creating the schema for mascotas

const mascotaSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    edad: {
        type: String,
        required: true
    },
    talla: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
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

var Mascotas = mongoose.model('Mascota', mascotaSchema);

module.exports = Mascotas;
