import express from 'express';
import Local from '../models/local';
import moment from "moment"

const LocalRouter = express.Router();

LocalRouter.route('/')
    .get((req, res) => {
        Local.find({}, (err, locais) => {
            res.json(locais)
        })
    })
    .post(async (req, res) => {
        let local = new Local(req.body);
        local.save()
        res.status(201).send(local)
    })
LocalRouter.route('/DELETEALL')
    .get((req, res) => {
        Local.deleteMany({}, () => {
            res.send("deletado")
        })
    })
LocalRouter.route('/:LocalId')
    .put((req, res) => {
        /*
        req.Local.title = req.body.title;
        req.Local.author = req.body.author;
        req.Local.save()
        res.json(req.Local)
        */
    })
    .patch((req, res) => {
        if (req.body._id) {
            delete req.body._id;
        }
        for (let p in req.body) {
            req.local[p] = req.body[p]
        }
        req.local.save()
        res.json(req.local)
    })//patch

export default LocalRouter