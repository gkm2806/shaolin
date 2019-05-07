import mongoose from 'mongoose';
import cuid from "cuid";

const Schema = mongoose.Schema;

const localModel = new Schema({
    id: { type: String, default:cuid()},
    nome: { type: String, required: true},
    beacon: {type: String, default: null}
})
export default mongoose.model('Local', localModel)