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
        console.log("req: ", req.body)
        console.log("Local: ", local)
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
    .get(async (req, res) => {
        let findUser = await Local.findOne({ _id: req.params.LocalId })
        if (!findUser) res.status(400).send("No Local found with this id")
        console.log(findUser._doc)
        res.status(200).send(findUser._doc)
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
    })
    .delete(async(req, res) => {
        try{
            await Local.deleteOne({_id: req.params.LocalId})
                .then(()=>
                    res.sendStatus(200)
                ).catch(()=>
                    res.sendStatus(400)
                )
        }catch(e){
            res.send(e)
        }
    });
/***************  B E A C O N S ****************/

LocalRouter.route('/:LocalId/beacon')
    .put(async (req, res) => {
        var newBeacon = req.body.beacon;
        var id = req.params.LocalId;

        var update = { beacon: newBeacon };
        Local.findOneAndUpdate({ "_id": id }, update, { new: true }).then((local)=>{
            res.status(202).send(local)
        }).catch(()=>{
            res.status(400)
        })
    })

LocalRouter.route('/beacons/:BeaconId')
    .get(async (req, res) => {
        let beaconLocals = await Local.find({ beacon: req.params.BeaconId })
        
        if (!beaconLocals) res.status(400).send("No local found within this beacon range")
        console.log(beaconLocals)
        res.status(200).send(beaconLocals)
    })

export default LocalRouter