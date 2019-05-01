import mongoose from 'mongoose';
import cuid from "cuid";

const Schema = mongoose.Schema;

const localModel = new Schema({
    id: { type: String, default:cuid()},
    nome: { type: String, required: true}
})
export default mongoose.model('Local', localModel)