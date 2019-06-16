import express from 'express';
import Usuarios from '../models/users';
import {generateToken} from "../models/users"
import bcrypt from "bcrypt-nodejs"
import Auth from "../auth/auth"
import axios from "axios"

const UserRouter = express.Router();

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
    .post((req,res,next) => Auth(req,res,next))
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
    
            Usuario._doc.token = generateToken({id: Usuario._id})

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
            if(!req.body.isSuap){
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
                    token:generateToken({id: user._id})
                });
            }else{
                
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error);
        }
    });

const withSuap = (req,res) => {
    axios.post(
        `https://suap.ifms.edu.br/api/v2/autenticacao/token/`,
        {
            username: req.body.userName,
            password: req.body.password
        }
    )
    .then((response) => {
        console.log(response.data)
        axios.get(`https://suap.ifms.edu.br/api/v2/minhas-informacoes/meus-dados/`,
            {
                headers: {'Authorization': `JWT ${response.data.token}`}
            }
        ).then((userdata) => {
            let user = {
                userName: userdata.data.nome_usual,
                permission: 1,
                siap: userdata.data.matricula,
                photo: `https://suap.ifms.edu.br${userdata.data.url_foto_75x100}`,
                token: generateToken({id: siap})
            }
            res.send(user).status(402)
        })
    }).catch ((error) => {
        console.log(error)
        res.status(500).send(error);
    })
}


export default UserRouter