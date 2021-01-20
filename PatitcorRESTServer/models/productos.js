const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

//Creating the schema for productos

const productoSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    tipo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    talla: {
        type: String,
        required: true
    },
    precio: {
        type: Currency,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

var Productos = mongoose.model('Producto', productoSchema);

module.exports = Productos;