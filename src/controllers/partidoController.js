const express = require('express');
const jwt = require('jsonwebtoken')

//const authConfig = require('../config/auth.json')

const Partido = require('../models/partido.js');

//const EnderecoPartido = require('../models/endereco/enderecoPartido.js');

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret);
}

router.get('/', async(req, res) => {
    try{
        const partidos = await Partido.find()

        return res.send({ partidos })
    } catch (err) {
        return res.status(400).send({ error: 'Error loading' });
    }
});

router.get('/:partidoId', async (req, res)=>{
    try{
        const partido = await Partido.findById(req.params.partidoId);//.select('+senha');

        return res.send({ partido })
    } catch (err) {
        return res.status(400).send({ error: 'Error loading' });
    }
});

router.post('/registrar', async (req, res) => {
    
    try{
    
        const { nome } = req.body;
        console.log(nome);
        if(await Partido.findOne({ nome })){
            return res.status(400).send({error: 'Item already exists'});
        }
    
       const partido = await Partido.create({nome});
       
       /*if(enderecoPartido != null){
            await Promise.all(enderecoPartido.map(async end =>{
                const endentre = new EnderecoPartido({...end, partido: partido._id});
                await endentre.save();
                partido.enderecoPartido.push(endentre);
            }));
        }*/
        
        await partido.save();

        return res.send({
            _id: partido.id
        });
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Registration failed'});
    }
});

/*router.put('/atualizar/:partidoId', async (req, res) => {
    try{
        const { nome, nomeResponsavel, enderecoPartido, telefone1, telefone2, emailResponsavel } = req.body;
    
        const partido = await Partido.findByIdAndUpdate(req.params.partidoId, { 
            nome,
            nomeResponsavel,
            telefone1,
            telefone2,
            emailResponsavel
            });
            
        partido.enderecoPartido = [];
    
        await EnderecoPartido.deleteMany({ partido: partido._id});
    
        await Promise.all(enderecoPartido.map(async end =>{
            const endbibli = new EnderecoPartido({...end, partido: partido._id});
            await endbibli.save();
            partido.enderecoPartido.push(endbibli);
        }));
    
        await partido.save();
    
        return res.send( {
            result:'Update Succesful',
            token: generateToken({ id: partido.id }),});
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Update failed'});
}});*/

router.delete('/apagar/:partidoId', async (req, res) => {
    try{
       
        await Partido.findByIdAndRemove(req.params.partidoId)
       // await EnderecoPartido.findOneAndRemove({entregador: req.params.partidoId});
        return res.send({log: 'Deleted Succesfully'})
 
     } catch (err) {
         console.log(err);
         return res.status(400).send({ error: 'Error deleting user' });
     }
});

router.delete('/apagarTodos', async (req, res) => {
    try{
        await Partido.deleteMany({})
        return res.send({log: 'Deleted Succesfully'})
 
     } catch (err) {
         console.log(err);
         return res.status(400).send({ error: 'Error deleting user' });
     }
});

module.exports = app => app.use('/partido', router);