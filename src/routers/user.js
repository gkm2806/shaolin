import express from 'express';
import Usuarios from '../models/users';
import {generateToken} from "../models/users"
import bcrypt from "bcrypt"
import Auth from "../auth/auth"
import axios from "axios"
import request from "request"
const UserRouter = express.Router();
import https from 'https';

const agent  = new https.Agent({
    rejectUnauthorized: false
})

if (!Usuarios.count()){
    let Usuario = new Usuarios({"username":"su","password":process.env.su_password, "permission":5});
    Usuario.save()
}
//console.log(Usuarios, UserRouter)
UserRouter.route('/')
    .get((req, res) => {
        Usuarios.find({}, (err, users) => {
            res.json(users)
        })
    })
    .post(async (req, res) => {
        try {
            let findUser = await Usuarios.findOne({ username: req.body.username }).exec()
            if (findUser) {
                return res.status(400).send({ message: "Usuario Já existente" });
            }
            req.body.password = bcrypt.hashSync(req.body.password, 10)
            let Usuario = new Usuarios(req.body);
            await Usuario.save()
            
            Usuario.password = undefined
            console.log(`Usuario \ ${req.body.username} \ criado`)
    
            Usuario._doc.token = generateToken({id: Usuario._id, nome: Usuario.username})

            res.status(201).send(Usuario._doc);
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
            console.log(req.body)
            if(req.body.isSuap == false){
                const user = await Usuarios.findOne({ username: req.body.username }).select('+password')
                if (!user) {
                    return res.status(400).send({ message: "Usuario nao encontrado" });
                }
                if (!bcrypt.compareSync(req.body.password.toString(), user.password)) {
                    console.log("invalid password")
                    return res.status(400).send({ message: "Senha incorreta" });
                }
                user.password = ""
                console.log(user.username + " conectado")
                res.send({
                    username: user.username,
                    permission: user.permission,
                    id: user._id,
                    token: generateToken({id: user._id, nome: user.username, permission: user.permission})
                });
            }else{
                axios.post(
                    `https://suap.ifms.edu.br/api/v2/autenticacao/token/`,
                    {
                        username: req.body.username,
                        password: req.body.password,
                    },
                    {
                        httpsAgent: agent
                    }
                )
                .then((response) => {
                    axios.get(`https://suap.ifms.edu.br/api/v2/minhas-informacoes/meus-dados/`,
                        {
                            headers: {'Authorization': `JWT ${response.data.token}`},
                            httpsAgent: agent
                        }
                    ).then((userdata) => {
                        let user = {
                            username: userdata.data.nome_usual,
                            permission: 1,
                            siap: userdata.data.matricula,
                            token:generateToken({id: userdata.data.matricula, nome: userdata.data.nome_usual, permission: 2}),
                            photo: `https://suap.ifms.edu.br${userdata.data.url_foto_75x100}`
                        }

                        res.send(user).status(402)
                    }).catch ((error) => {
                        console.log(error)
                        res.status(500).send(error);
                    })
                }).catch ((error) => {
                    console.log(error)
                    res.status(500).send(error);
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error);
        }
    });

export default UserRouter