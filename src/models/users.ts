import mongoose from 'mongoose';
import bcrypt from "bcrypt"
import "dotenv"
import {IUser} from "../interfaces/IUser"

import jwp from "jsonwebtoken"

const Schema = mongoose.Schema;

export function generateToken(params={}){
    return jwp.sign(params, "BaleiaQueCriaOProprioOceano",{
        expiresIn: 86400
    })
}
const UserModel = new Schema({
    username: { type: String, required: true},
    password: { type: String, required: true, select: false},
    permission: {type: Number, default: 1}

})

UserModel.pre('save', function(next){
    console.log("criando Usuario")
    next()
})

export default mongoose.model<IUser & mongoose.Document>('User', UserModel)