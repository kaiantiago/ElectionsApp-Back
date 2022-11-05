const express = require('express');

const Candidato = require('../models/candidato.js');

//const Biblioteca = require('../models/biblioteca.js');

const Partido = require('../models/partido.js');
//Podemos usar o Router para definir as rotas para o usuário
const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const candidatos = await Candidato.find().populate('partidoCandidato');;

        return res.send({ candidatos })
    } catch (err) {
        return res.status(400).send({ error: 'Error loading '+err });
    }
});

router.get('/estado/:estado', async (req, res)=>{
    try{
        const candidatos = await Candidato.find({estado: req.params.estado}).populate('partidoCandidato');
        return res.send({ candidatos })
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao achar candidato' });
    }
});

router.get('/numero/:numero', async (req, res)=>{
    try{
        const candidatos = await Candidato.find({numero: req.params.numero}).populate('partidoCandidato');
        return res.send({ candidatos })
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao achar candidato' });
    }
});


router.post('/registrar', async (req, res) => {
    
    try{

       //const candidato = await candidato.create(req.body);
       const { nome, partidoCandidato, numero, cargo, estado, votos, imgId } = req.body;

       /*if(await Candidato.findOne({ numero })){
            return res.status(400).send({error: 'Candidato already exists'});
        }*/

        const candidato = await Candidato.create({nome, partidoCandidato, numero, cargo, estado, votos, imgId});
        
        /*if(partidoCandidato != null){
            await Promise.all(partidoCandidato.map(async end => {
            const enduser = new Partido({...end, usuario: usuario._id});
            await enduser.save();
            usuario.partidoCandidato.push(enduser);
            }));
        }*/

        await candidato.save();

        return res.send({
            _id: candidato.id
        });

    }
    catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Registration failed'});
    }
});

router.put('/atualizar/:candidatoId', async (req, res) => {
    try{
        const candidato = await Candidato.findByIdAndUpdate(req.params.candidatoId, req.body);
    
        await candidato.save();
    
        return res.send( {result:'Update Succesful'});
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Update failed'});
}});

router.delete('/apagar/:candidatoId', async (req, res) => {
    try{
       
        await Candidato.findByIdAndRemove(req.params.candidatoId)
        return res.send({log: 'Deleted Succesfully'})
 
     } catch (err) {
         console.log(err);
         return res.status(400).send({ error: 'Error deleting user' });
     }
});

module.exports = app => app.use('/candidato', router);