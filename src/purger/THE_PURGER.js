import Aula from "../models/aula"
import moment from "moment"
import schedule from "node-schedule"
import aulaRouter from "../routers/aulas";

console.log("Welcome to aula hell")
let oldAulas = []

var j = schedule.scheduleJob({hour: 0, minute: 0, dayOfWeek: 5}, function () {
    console.log("PURGIN ALL THE UNHOLY SOU--aulas")
    Aula.find({}, (err, aulas) => {
        let today = moment.now()

        aulas.forEach(async (aula) => {
            console.log(aula)
            if (!aula.fixa && (moment(aula.createdAt, "YYYYMMDDhhmmss", true).diff(today, 'days') < -7)) {

                aula.past = true
                console.log("DENTRO DO IF: ", aula)
                await Aula.findByIdAndUpdate(aula._id, aula)
            }

        })

    })
});