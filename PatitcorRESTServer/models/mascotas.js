const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

//Creating the schema for mascotas

const mascotaSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    edad: {
        type: Number,
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
    vacunacion: {
        type: String,
        required: true
    },
    esterilizado: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

var Mascotas = mongoose.model('Mascota', mascotaSchema);

module.exports = Mascotas;