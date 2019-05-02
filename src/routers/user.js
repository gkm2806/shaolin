import express from 'express';
import Usuarios from '../models/users';
import {generateToken} from "../models/users"
import bcrypt from "bcrypt"
import Auth from "../auth/auth"

const UserRouter = express.Router();


UserRouter.route('/')
    .get((req, res) => {
        Usuarios.find({}, (err, users) => {
            res.json(users)
        })
    })
    .post((req,res,next) => Auth(req,res,next))
    .post(async (req, res) => {
        try {
            let findUser = await Usuarios.findOne({ username: req.body.username }).exec()
            if (findUser) {
                return res.status(400).send({ message: "Usuario Já existente" });
            }
            req.body.password = bcrypt.hashSync(req.body.password, 10)
            let Usuario = new Usuarios({...req.body});
            
            await Usuario.save()
            Usuario.password = undefined
            console.log("Usuario \""+req.body.username+"\" criado")
            res.status(201).send({...Usuario._doc, token:generateToken({id: Usuario._id})});
        } catch (error) {
            console.log(error)
            res.status(500).send(error);
        }
    })

UserRouter.route('/DELETEALL')
    .get((req, res) => {
        Usuarios.deleteMany({}, () => {
            res.send("deletado")
        })
    })

UserRouter.route('/:id')
    .get(async (req, res) => {
        let findUser = await Usuarios.findOne({ _id: req.params.id })
        console.log(findUser._doc)
        if(!findUser) res.status(400).send("No user found with this id")
        res.status(200).send(findUser._doc)
    })

UserRouter.route("/login")
    .post(async (req, res) => {
        try {
            const user = await Usuarios.findOne({ username: req.body.username }).select('+password')
            if (!user) {
                return res.status(400).send({ message: "!User" });
            }
            if (!bcrypt.compareSync(req.body.password.toString(), user.password)) {
                console.log("invalid password")
                return res.status(400).send({ message: "invalid password" });
            }
            user.password = ""
            res.send({
                username: user.username,
                permission: user.permission,
                id: user._id,
                token:generateToken({id: user._id})
            });
        } catch (error) {
            console.log(error)
            res.status(500).send(error);
        }
    });

export default UserRouter