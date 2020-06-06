import express from 'express';
import User from '../models/users';
import { generateToken } from "../models/users"
import bcrypt from "bcrypt"
import Auth from "../auth/auth"
import SuapService from "../services/SuapService"
import { Container } from 'typedi';

const UserRouter = express.Router();

if (!User.count()) {
    let Usuario = new User({ "username": "su", "password": process.env.su_password, "permission": 5 });
    Usuario.save()
}
//console.log(User, UserRouter)
UserRouter.route('/')
    .get((req, res) => {
        User.find({}, (err, users) => {
            res.json(users)
        })
    })
    .post(async (req, res) => {
        try {
            let findUser = await User.findOne({ username: req.body.username }).exec()
            if (findUser) {
                return res.status(400).send({ message: "Usuario Já existente" });
            }
            req.body.password = bcrypt.hashSync(req.body.password, 10)
            let Usuario = new User(req.body);
            await Usuario.save()

            Usuario.password = undefined
            console.log(`Usuario \ ${req.body.username} \ criado`)

            Usuario._doc.token = generateToken({ id: Usuario._id, nome: Usuario.username })

            res.status(201).send(Usuario._doc);
        } catch (error) {
            console.log(error)
            res.status(500).send(error);
        }
    })

UserRouter.route('/DELETEALL')
    .get((req, res) => {
        User.deleteMany({}, () => {
            res.send("deletado")
        })
    })

UserRouter.route('/:id')
    .get(async (req, res) => {
        let findUser = await User.findOne({ _id: req.params.id })
        console.log(findUser._doc)
        if (!findUser) res.status(400).send("No user found with this id")
        res.status(200).send(findUser._doc)
    })

UserRouter.route("/login")
    .post(async (req, res, next) => {
        try {
            if (req.body.isSuap == false) {
                const user = await User.findOne({ username: req.body.username }).select('+password')
                if (!user) {
                    return res.status(400).send({ message: "Usuario nao encontrado" });
                }
                if (!bcrypt.compareSync(req.body.password.toString(), user.password)) {
                    return res.status(400).send({ message: "Senha incorreta" });
                }
                user.password = ""
                console.log(user.username + " conectado")
                res.send({
                    username: user.username,
                    permission: user.permission,
                    id: user._id,
                    token: generateToken({ id: user._id, nome: user.username, permission: user.permission })
                });
            } else {
                const SuapServiceInstance = Container.get(SuapService)
                const userToken = await SuapServiceInstance.GetToken(req.body.username, req.body.password)
                const userData = await <any>SuapServiceInstance.GetUserData(userToken.data.token)

                let user = {
                    username: userData.data.nome_usual,
                    permission: 1,
                    siap: userData.data.matricula,
                    token: generateToken({ id: userData.data.matricula, nome: userData.data.nome_usual, permission: 2 }),
                    photo: `https://suap.ifms.edu.br${userData.data.url_foto_75x100}`
                }
                res.send(user).status(402)
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error);
            next();
        }
    });

export default UserRouter