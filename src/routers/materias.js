import express from 'express';
import Materia from '../models/materia';

const Model = Materia

export const ModelRouter = express.Router();

ModelRouter.route('/')
    .get((req, res) => {
        Model.find({}, (err, documents) => {
            res.json(documents)
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
        let find = await Model.findOne({ _id: req.params._id })
        if (!find) res.status(400).send("Nothing found")
        console.log(find._doc)
        res.status(200).send(find._doc)
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
