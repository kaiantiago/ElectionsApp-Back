const mongoose = require('../database');

const votoSchema = new mongoose.Schema({
    tituloEleitor: {
        type: Number,
        unique: true,
        require: true,
    },
    estado: {
        type: String,
        //unique: true,
        require: true,
        lowercase: true,
    },
    candidatoGov: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidato',
        require: true,
    },
    candidatoPres: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidato',
        require: true,
    },
    candidatoSen: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidato',
        require: true,
    },
    dataVoto: {
        type: Date,
        require: true,
        default: Date.now,
    },
});

const Voto = mongoose.model('Voto', votoSchema);

module.exports = Voto;