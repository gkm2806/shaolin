import mongoose from 'mongoose';
import cuid from "cuid";

const Schema = mongoose.Schema;

const localModel = new Schema({
    id: { type: String, default:cuid()   },
    nome: { type: String, required: true},
    color: {type: String, default:(() => '#'+(Math.random()*0xFFFFFF<<0).toString(16))}
})
export default mongoose.model('Turma', localModel)