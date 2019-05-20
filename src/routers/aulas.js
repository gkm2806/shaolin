
import express from 'express';
import Aula from '../models/aula';
import Turma from "../models/turma"
import moment from "moment"
import Auth from "../auth/auth"
import User from "../models/users"

const aulaRouter = express.Router();

const neutralAulas = ["PE","EAD","FIC"]

const teste = async(req,res) => {
    console.log("prof", req.body.professor)
    let creator = await User.findOne({_id: req.body.createdBy})
    if(creator.permission > 2){
        req.body.fixa = true
    }else if(req.body.professor != creator.username){
        res.status(403).send("Professores não podem agendar aula para colegas!")
    }
    req.body.createdBy = creator.username
}

aulaRouter.route('/')
    .get((req, res) => {
        Aula.find({}, (err, aulas) => {
            res.json(aulas)
        })  
    })
    .post((req,res,next) => Auth(req,res,next))
    .post(async (req,res) => {
        if(!req.body.turma)res.status(400).send("No Turma provided")
        let fail = 0
        let inicioMoment = moment(req.body.horaInicio,"HH:mm");
        let fimMoment = moment(req.body.horaFim,"HH:mm");
        let aulas = []

        let turmaColor = await Turma.findOne({ nome: req.body.turma })
        if(!turmaColor)res.status(400).send("Turma não encontrada no sistema")
        await teste(req, res)
        req.body.color = turmaColor.color
        while(inicioMoment.diff(fimMoment,"minutes") < -30){
            if((inicioMoment.format("HH:mm")) == "09:15" || (inicioMoment.format("HH:mm") == "15:15")) inicioMoment.add(15,"minutes") //intervalos
            if((inicioMoment.format("HH:mm")) == "12:30") inicioMoment.add(30,"minutes") //mudança de turno
            req.body.horaInicio = inicioMoment.format("HH:mm")

            let aula = new Aula(req.body);
            const {sala,turma,professor,horaInicio, dia} = aula
            await Aula.find({"horaInicio": horaInicio, "dia": dia, 'sala':sala})
                .then((result)=>{
                    if(result.length === 0){
                        aulas.push(aula)
                    }else{
                        fail++
                        res.status(409).send("Colisão de Local Detectada")
                        console.log("Colisão de Local Detectada")
                    }
                }).catch((err)=>{
                    fail++
                    res.status(405).send(err)
                    console.log("Erro")
                })
            if(!neutralAulas.includes(turma)){
                await Aula.find({"horaInicio": horaInicio, "dia": dia, 'turma':turma})
                    .then((result)=>{
                        if(result.length === 0){
                            aulas.push(aula)
                        }else{
                            fail++
                            res.status(409).send("Colisão de Turma Detectada")
                            console.log("Colisão de Turma Detectada")
                        }
                    }).catch((err)=>{
                        fail++
                        res.status(405).send(err)
                        console.log("Erro")
                    })
            }
            await Aula.find({"horaInicio": horaInicio, "dia": dia, 'professor':professor})
                .then((result)=>{
                    if(result.length === 0){
                        aulas.push(aula)
                    }else{
                        fail++
                        res.status(409).send("Colisão de Professor Detectada")
                        console.log("Colisão de Professor Detectada")
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
            console.log(`Trying to delete ${req.params.aulaId}`)
            await Aula.deleteOne({_id: req.params.aulaId})
                .then(()=>{
                    console.log(`${req.params.aulaId} deleted`)
                    res.sendStatus(200)
                }).catch(()=>
                    res.sendStatus(400)
                )
        }catch(e){
            res.send(e)
        }
    });


export default aulaRouter