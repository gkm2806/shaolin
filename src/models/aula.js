import mongoose from 'mongoose';
import cuid from "cuid"
import moment from "moment"

const Schema = mongoose.Schema;

const aulaModel = new Schema({
    id: {type: String},
    creationdate: {type: String, required: true},
    sala: {type: String},
    materia: {type: String},
    turma: {type: String},
    horaInicio: {type: String},
    horaFim: {type: String},
    dia: {type: String},
    professor: {type: String},
    createdBy: {Type: String},
    fixa: {Type: Boolean, default: false}
});

aulaModel.pre("save", function(next) {
    console.log(this)
    let today = moment.now()
    console.log(today)


    next();
});

export default mongoose.model('Aula', aulaModel)
