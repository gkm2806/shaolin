import mongoose from 'mongoose';
import cuid from "cuid";

const Schema = mongoose.Schema;

const localModel = new Schema({
    id: { type: String, default:cuid()   },
    nome: { type: String, required: true},
    color: {type: String, default:(() => "#000000".replace(/0/g,()=>(~~(Math.random()*16)).toString(16)))}
})
export default mongoose.model('Turma', localModel)