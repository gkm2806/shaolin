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
    password: { type: String, required: true, select: false},
    permission: {type: Number, default: 1}

})

usuariosModel.pre('save', function(next){
    console.log("criando Usuario")
    next()
})

export default mongoose.model('Usuarios', usuariosModel)