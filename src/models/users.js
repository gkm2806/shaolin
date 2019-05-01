import mongoose from 'mongoose';
import bcrypt from "bcrypt"
import "dotenv/config"

const Schema = mongoose.Schema;

const usuariosModel = new Schema({
    username: { type: String, required: true},
    password: { type: String, required: true}

})

export default mongoose.model('Usuarios', usuariosModel)