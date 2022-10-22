const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const candidatoSchema = new mongoose.Schema({
    nome: {
        type: String,
        unique: true,
        require: true,
    },
    partidoCandidato: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partido',
        require: true,
    }],
    numero:{
        type: Number,
        unique: true,
        require: true,
    },
    cargo: {
        type: String,
        //unique: true,
        require: true,
        lowercase: true,
    },
    estado: {
        type: String,
        //unique: true,
        require: true,
        lowercase: true,
    },
    votos: {
        type: Number,
        default: 0,
    },
    imgId: {
        type: String,
    },
    criadoEm: {
        type: Date,
        default: Date.now,
    },
});

candidatoSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;

    next();
});

const Candidato = mongoose.model('Candidato', candidatoSchema);

module.exports = Candidato;