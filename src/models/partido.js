const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const partidoSchema = new mongoose.Schema({
    nome: {
        type: String,
        //required: true,
    },
    CreatedAt: {
        type: Date,
        default: Date.now,
    },
});

partidoSchema.pre('save', async function(next) {
    if(this.senha != undefined) {
        const hash = await bcrypt.hash(this.senha, 10);
        this.senha = hash;
    }
    next();
    
});

const Partido = mongoose.model('Partido', partidoSchema);

module.exports = Partido;