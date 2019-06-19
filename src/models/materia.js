import mongoose from 'mongoose';

const materiaModel = new mongoose.Schema({
    abreviacao: { type: String, required: true},
    nome: { type: String, required: true}
})
export default mongoose.model('Materia', materiaModel)