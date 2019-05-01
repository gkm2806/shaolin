import mongoose from 'mongoose';
import bcrypt from "bcrypt"
import "dotenv/config"
import jwp from "jsonwebtoken"

const Schema = mongoose.Schema;

export function generateToken(params={}){
    return jwp.sign(params, process.env.HASH_SALT,{
        expiresIn: 86400
    })
}
const usuariosModel = new Schema({
    username: { type: String, required: true},
    password: { type: String, required: true}

})

export default mongoose.model('Usuarios', usuariosModel)