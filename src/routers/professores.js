import express from 'express';
import Professor from '../models/professor';
import moment from "moment"

const ProfessorRouter = express.Router();

ProfessorRouter.route('/')
    .get((req, res) => {
        Professor.find({}, (err, professores) => {
            res.json(professores)
        })
    })
    .post(async (req, res) => {
        let professor = new Professor(req.body);
        professor.save()
        res.status(201).send(professor)
    })
ProfessorRouter.route('/DELETEALL')
    .get((req, res) => {
        Professor.deleteMany({}, () => {
            res.send("deletado")
        })
    })
ProfessorRouter.route('/:ProfessorId')
    .put((req, res) => {
        /*
        req.Professor.title = req.body.title;
        req.Professor.author = req.body.author;
        req.Professor.save()
        res.json(req.Professor)
        */
    })
    .patch((req, res) => {
        if (req.body._id) {
            delete req.body._id;
        }
        for (let p in req.body) {
            req.professor[p] = req.body[p]
        }
        req.professor.save()
        res.json(req.professor)
    })

    .delete(async(req, res) => {
        try{
            await Professor.deleteOne({id: req.params.ProfessorId})
                .then(()=>
                    res.sendStatus(200)
                ).catch(()=>
                    res.sendStatus(400)
                )
        }catch(e){
            res.send(e)
        }
    });

export default ProfessorRouter