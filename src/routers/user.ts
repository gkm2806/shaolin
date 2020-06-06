import express from 'express';
import Auth from "../auth/auth"
import SuapService from "../services/SuapService"
import { Container } from 'typedi';
import UserService from '../services/UserService';

const UserRouter = express.Router();
const UserInterface = Container.get(UserService)

UserRouter.route('/')
    .get(async (req, res) => {
      const users = await UserInterface.FindAllUsers()
      res.send(users)
    })
    .post(async (req, res) => {
        try {
          const newUser = await UserInterface.CreateUser({...req.body})
          res.send(newUser)
        } catch (error) {
            console.log(error)
            res.status(500).send(error);
        }
    })

UserRouter.route('/DELETEALL')
    .get(async(req, res) => {
      await UserInterface.DeleteAll()
      res.send({message: "Deletados", status: 200})
    })

UserRouter.route('/:id')
    .get(async (req, res) => {
      const { id } = req.body
        let findUser = await UserInterface.FetchOne(id)
        res.status(200).send(findUser)
    })

UserRouter.route("/login")
    .post(async (req, res, next) => {
      const { username, password, isSuap } = req.body;
        try {
            if (isSuap == false) {
              const login = await UserInterface.Login(username, password)
              res.send(login)
            } else {
              console.log("Olar")
              const suapLogin = await UserInterface.SuapLogin(username, password)
              res.send(suapLogin)
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error);
            next();
        }
    });

export default UserRouter
