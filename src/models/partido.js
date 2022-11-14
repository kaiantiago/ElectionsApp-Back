const mongoose = require('../database');
//const bcrypt = require('bcryptjs');

const partidoSchema = new mongoose.Schema({
    nome: {
        type: String,
        unique: true,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    CreatedAt: {
        type: Date,
        default: Date.now,
    },
});

partidoSchema.pre('save', async function(next) {
    
    next();
    
});

const Partido = mongoose.model('Partido', partidoSchema);

module.exports = Partido;