import express from 'express';
import Aula from '../models/aula';
import moment from "moment"

const aulaRouter = express.Router();

aulaRouter.route('/')
    .get((req, res) => {
        Aula.find({}, (err, aulas) => {
            res.json(aulas)
        })  
    })
    .post(async (req,res) => {
        let fail = 0
        let inicioMoment = moment(req.body.horaInicio,"HH:mm");
        let fimMoment = moment(req.body.horaFim,"HH:mm");
        let aulas = []

        while(inicioMoment.diff(fimMoment,"minutes") < -30){
            if((inicioMoment.format("HH:mm")) == "09:15" || (inicioMoment.format("HH:mm") == "15:15")) inicioMoment.add(15,"minutes") //intervalos
            if((inicioMoment.format("HH:mm")) == "12:30") inicioMoment.add(30,"minutes") //mudança de turno
            req.body.horaInicio = inicioMoment.format("HH:mm")
            let aula = new Aula(req.body);
            const {sala,turma,professor,horaInicio, dia} = aula
            await Aula.find({
                "horaInicio": horaInicio,
                "dia": dia,
                $or:[ {'sala':sala}, {'turma':turma}, {'professor':professor} ]
            }).then((result)=>{
                if(result.length === 0){
                    aulas.push(aula)
                }else{
                    fail++
                    res.status(409).send("Colisao Detectada")
                    console.log("colisao")
                }
            }).catch((err)=>{
                fail++
                res.status(405).send(err)
                console.log("Erro")
            })
            inicioMoment.add(45,"minutes")
        } 
        if(fail==0){
            for(var i = 0; i < aulas.length; i++){
                aulas[i].save()
                console.log("Aula criada no sistema")
            }
            console.log("Retornando aula")
            res.status(201).send(aulas)
        }
    })
aulaRouter.route('/DELETEALL')
    .get((req, res) => {
        Aula.deleteMany({},()=>{
            res.send("deletado")
        })
    })
aulaRouter.route('/:aulaId')
    .put((req,res) => {
        /*
        req.aula.title = req.body.title;
        req.aula.author = req.body.author;
        req.aula.save()
        res.json(req.aula)
        */
    })
    .patch((req,res)=>{
        if(req.body._id){
            delete req.body._id;
        }
        for( let p in req.body ){
            req.aula[p] = req.body[p]
        }
        req.aula.save()
        res.json(req.aula)
    })//patch
    .delete(async(req, res) => {
        try{
            await Aula.deleteOne({id: req.params.aulaId})
                .then(()=>
                    res.sendStatus(200)
                ).catch(()=>
                    res.sendStatus(400)
                )
        }catch(e){
            res.send(e)
        }
    });


export default aulaRouter