import mongoose from 'mongoose';
import cuid from "cuid"
import moment from "moment"

const Schema = mongoose.Schema;

const aulaModel = new Schema({
    sala: {type: String},
    materia: {type: String},
    turma: {type: String},
    horaInicio: {type: String},
    horaFim: {type: String},
    dia: {type: String},
    professor: {type: String},

    createdAt: {type: String, default: (()=> moment().format('YYYYMMDDhhmmss'))},
    createdBy: {type: String, required: true},

    color: {type: String, required: true},

    fixa: {type: Boolean, default: false},
    past: {type: Boolean, default: false}
});

aulaModel.pre("save", function(next) {
    let today = moment.now()
    console.log("today: ", today)
    next();
});

export default mongoose.model('Aula', aulaModel)
