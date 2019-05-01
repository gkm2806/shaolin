import mongoose from 'mongoose';
import cuid from "cuid";

const Schema = mongoose.Schema;

const localModel = new Schema({
    suap: { type: String},
    nome: { type: String, required: true}
})
export default mongoose.model('Professor', localModel)