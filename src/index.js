import "@babel/polyfill";
import express from 'express'
import cors from "cors"
import bodyParser from "body-parser"
import "./database/mongoose"
//import "./purger/THE_PURGER"
import UserRouter from "./routers/user"
import aulaRouter from './routers/aulas';
import ProfessorRouter from './routers/professores'
import LocalRouter from './routers/locais'
import {ModelRouter as TurmaRouter} from './routers/turmas'

require('ssl-root-cas/latest')
  .inject()
  .addFile(__dirname + '/AddTrustExternalCARoot.crt')
  .addFile(__dirname + '/icpedusha2g2.crt')
  .addFile(__dirname + '/suap.ifms.edu.br.crt')
  require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();

const port = process.env.PORT || 4000

var app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin:"*"}))

app.get('/', (req, res) => res.send('<body> <ul> <li><a href="/api/aulas">aulas</a></li> <li><a href="/api/turmas">turmas</a></li> <li><a href="/api/salas">salas</a></li> <li><a href="/api/professores">professores</a></li> </ul></body>'))

app.use('/api/aulas', aulaRouter);
app.use('/api/professores', ProfessorRouter);
app.use('/api/locais', LocalRouter);
app.use('/api/users', UserRouter);
app.use('/api/turmas', TurmaRouter)
console.log("PORT = ", port)
app.listen(port, () => console.log(`Welcome aboard captain, all systems online!`))