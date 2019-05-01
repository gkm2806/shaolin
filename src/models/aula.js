import mongoose, {Schema} from 'mongoose';
import cuid from "cuid"
import moment from "moment"


const aulaModel = new Schema({
    id: {type: String},
    sala: {type: String},
    materia: {type: String},
    turma: {type: String},
    horaInicio: {type: String},
    horaFim: {type: String},
    dia: {type: String},
    professor: {type: String},
    createdAt: {Type: Number},
    createdBy: {Type: String}
});

aulaModel.pre("save", function(next) {
    this.id = cuid();
    this.createdAt = moment.now();
    next();
});

export default mongoose.model('Aula', aulaModel)
