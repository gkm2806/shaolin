import bcrypt from "bcrypt"
import User from '../models/users';
import { generateToken } from "../models/users"
import _ from 'lodash';
import { Container } from 'typedi';
import SuapService from "../services/SuapService"
import { IUser } from '../interfaces/IUser';

export default class UserService{
  FindAllUsers = async() => {
    const users = await User.find({})
    return users
  }

  FetchOne = async(id) => {
    const findUser = await User.findOne({ _id: id });
    if (!findUser)
      return {message:"No user found", status: 404}
    return findUser
  }

  private FindUser =  (username) => {
    return User.findOne({ username }).select('+password')
  }

  CreateUser = async(userParams: IUser) => {
    const user = await <any>this.FindUser(userParams.username)

    if(user)
      return {message: "User Already Exists", status: 400}

    userParams.password = await bcrypt.hashSync(userParams.password, 10)
    let newUser = new User(userParams)
    await newUser.save()

    newUser._doc.password = null

  return {data:{...newUser._doc, token: generateToken({ id: newUser._id, nome: newUser.username })}}
  }

  Login = async (username, password) => {
    const user = <any>await this.FindUser(username)

    if(!user) return ({message: "user not found", status: 404})

    if (!this._RightPassword(password, user.password))
      return ({message: "Wrong Password", status: 401})

    user.password = ""
    return {..._.omit(user, password), status: 200}
  }

  SuapLogin = async (username, password) => {
    const SuapServiceInstance = Container.get(SuapService)
    const userToken = await SuapServiceInstance.GetToken(username, password)
    const userData = await <any>SuapServiceInstance.GetUserData(userToken.data.token)
    console.log(userData.data)
    const user = {
        username: userData.data.nome_usual,
        permission: 1,
        siap: userData.data.matricula,
        token: generateToken({ id: userData.data.matricula, nome: userData.data.nome_usual, permission: 2 }),
        photo: `https://suap.ifms.edu.br${userData.data.url_foto_75x100}`
    }

    return {...user, status: 200}

  }

  DeleteAll = async() => {
    const deletion =  User.deleteMany
    //MARK: Know how the fuck this works
    console.log(deletion)
  }

  private _RightPassword(password, hashPassword): boolean{
    return bcrypt.compareSync(password.toString(), hashPassword)
  }
}
