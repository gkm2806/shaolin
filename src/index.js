import express from 'express'
import cors from "cors"
import bodyParser from "body-parser"
import "./database/mongoose"

import UserRouter from "./routers/user"
import aulaRouter from './routers/aulas';
import ProfessorRouter from './routers/professores'
import LocalRouter from './routers/locais'

var app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin:"*"}))

app.get('/', (req, res) => res.send('Alo World!'))

app.use('/api/aulas', aulaRouter);
app.use('/api/professores', ProfessorRouter);
app.use('/api/locais', LocalRouter);
app.use('/api/users', UserRouter);
console.log("PORTA = ", process.env.PORT)
app.listen(process.env.PORT || 4000, () => console.log(`online and ready!`))