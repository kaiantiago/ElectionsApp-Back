const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth.json')

const Voto = require('../models/voto.js');
//const EnderecoVoto = require('../models/endereco/enderecoVoto.js');

//Podemos usar o Router para definir as rotas para o voto
const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret);
}

router.get('/:votoId', async (req, res)=>{
    try{
        const voto = await Voto.findById(req.params.votoId);

        return res.send({ voto })
    } catch (err) {
        return res.status(400).send({ error: 'Error loading' });
    }
});

/*router.post('/auth', async (req, res) => {
    const { email, senha } = req.body;

    const voto = await Voto.findOne({email}).select('+password');

    if(voto == null)
        return res.status(400).send({ error: 'User not found'});

    if(await bcrypt.compare(senha, voto.senha))
        return res.status(400).send({ error: 'Invalid password'});

    voto.senha = undefined;

    res.send({ 
        token: generateToken({ id: voto.id }),
        votoid: voto.id
    });
});*/


router.post('/registrar', async (req, res) => {
    
    try{
        const { tituloEleitor, estado, candidatoGov, candidatoPres, candidatoSen } = req.body;

        if(await Voto.findOne({ tituloEleitor })){
            return res.status(400).send({error: 'Ja votou'});
        }
    
       const voto = await Voto.create({tituloEleitor, estado,candidatoGov, candidatoPres,candidatoSen});
        
        await voto.save();

        return res.send({
            _id: voto.id, 
        });
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Registration failed'});
    }
});

/*router.put('/atualizar/:votoId', async (req, res) => {
    try{
        const { nome, dataDeAniversario, enderecoVoto, meioDeTransporte, telefone1, telefone2, email, senha } = req.body;

        const voto = await Voto.findByIdAndUpdate(req.params.votoId, { 
            nome,
            dataDeAniversario,
            meioDeTransporte,
            telefone1,
            telefone2,
         });
        
         voto.enderecoVoto = [];

        await EnderecoVoto.deleteMany({ voto: voto._id});
        

        await Promise.all(enderecoVoto.map(async end =>{
            const endentre = new EnderecoVoto({...end, voto: voto._id});
            await endentre.save();
            voto.enderecoVoto.push(endentre);
        }));

        await voto.save();

        return res.send({

            token: generateToken({ id: voto.id }), 
        });
    }
    catch (err) {
        console.log(err);
}});*/

router.delete('/apagar/:votoId', async (req, res) => {
    try{
       
       await Voto.findByIdAndRemove(req.params.votoId).populate('enderecoVoto')
       await EnderecoVoto.findOneAndRemove({voto: req.params.votoId});
       return res.send({log: 'Deleted Succesfully'})

    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Error deleting user' });
    }
});

module.exports = app => app.use('/voto', router);