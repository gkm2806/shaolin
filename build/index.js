"use strict";

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

require("./database/mongoose");

var _user = _interopRequireDefault(require("./routers/user"));

var _aulas = _interopRequireDefault(require("./routers/aulas"));

var _professores = _interopRequireDefault(require("./routers/professores"));

var _locais = _interopRequireDefault(require("./routers/locais"));

var _turmas = require("./routers/turmas");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import "./purger/THE_PURGER"
var port = process.env.PORT || 4000;
var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _cors["default"])({
  origin: "*"
}));
app.get('/', function (req, res) {
  return res.send('<body> <ul> <li><a href="/api/aulas">aulas</a></li> <li><a href="/api/turmas">turmas</a></li> <li><a href="/api/salas">salas</a></li> <li><a href="/api/professores">professores</a></li> </ul></body>');
});
app.use('/api/aulas', _aulas["default"]);
app.use('/api/professores', _professores["default"]);
app.use('/api/locais', _locais["default"]);
app.use('/api/users', _user["default"]);
app.use('/api/turmas', _turmas.ModelRouter);
console.log("PORT = ", port);
app.listen(port, function () {
  return console.log("Welcome aboard captain, all systems online!");
});
//# sourceMappingURL=index.js.map