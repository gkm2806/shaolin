import express from 'express';
import Turma from '../models/turma';

const Model = Turma

export const ModelRouter = express.Router();

ModelRouter.route('/')
    .get((req, res) => {
        Model.find({}, (err, locais) => {
            res.json(locais)
        })
    })
    .post(async (req, res) => {
        let model = new Model(req.body);
        model.save()
        res.status(201).send(model)
    })
ModelRouter.route('/DELETEALL')
    .get(async (req, res) => {
        await Model.deleteMany({}, () => {
            res.send("deletado")
        })
    })
ModelRouter.route('/:_id')
    .get(async (req, res) => {
        let findUser = await Model.findOne({ _id: req.params._id })
        if (!findUser) res.status(400).send("No turma found with this id")
        console.log(findUser._doc)
        res.status(200).send(findUser._doc)
    })
    .patch((req, res) => {
        if (req.body._id) {
            delete req.body._id;
        }
        for (let p in req.body) {
            req.model[p] = req.body[p]
        }
        req.model.save()
        res.json(req.model)
    })
    .delete(async(req, res) => {
        try{
            await Model.deleteOne({_id: req.params._id})
                .then(()=>
                    res.sendStatus(200)
                ).catch(()=>
                    res.sendStatus(400)
                )
        }catch(e){
            res.send(e)
        }
    });
