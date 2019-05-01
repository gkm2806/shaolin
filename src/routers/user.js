import express from 'express';
import Usuarios from '../models/users';
import bcrypt from "bcrypt"

const UserRouter = express.Router();

UserRouter.route('/')
    .get((req, res) => {
        Usuarios.find({}, (err, users) => {
            res.json(users)
        })
    })
    .post(async (req, res) => {
        req.body.password = bcrypt.hashSync(req.body.password, 10)
        let Usuario = new Usuarios({username: req.body.username, password: req.body.password});
        await Usuario.save()
        console.log("Usuario criado")
        res.status(201).send(Usuario)
    })

UserRouter.route('/DELETEALL')
    .get((req, res) => {
        Usuarios.deleteMany({}, () => {
            res.send("deletado")
        })
    })
UserRouter.route('/:userId')
    .put((req, res) => {

    })

UserRouter.route("/login")
    .post(async (req,res) => {
        try {
            let user = await Usuarios.findOne({ username: req.body.username })
            if(!user) {
                return res.status(400).send({ message: "!User" });
            }
            if(!bcrypt.compareSync(req.body.password.toString(), user.password)) {
                console.log("invalid password")
                return res.status(400).send({ message: "invalid password" });
            }
            res.send({ message: "success" });
        } catch (error) {
            console.log(error)
            res.status(500).send(error);
            
        }
    });

export default UserRouter