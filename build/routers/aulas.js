"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _aula = _interopRequireDefault(require("../models/aula"));

var _turma = _interopRequireDefault(require("../models/turma"));

var _moment = _interopRequireDefault(require("moment"));

var _auth = _interopRequireDefault(require("../auth/auth"));

var _users = _interopRequireDefault(require("../models/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var aulaRouter = _express["default"].Router();

var neutralAulas = ["PE", "EAD", "FIC"];

var teste =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var creator;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _users["default"].findOne({
              _id: req.body.createdBy
            });

          case 2:
            creator = _context.sent;

            if (creator.permission > 2) {
              req.body.fixa = true;
            } else if (req.body.professor != creator.username) {
              res.status(403).send("Professores não podem agendar aula para colegas!");
            }

            req.body.createdBy = creator.username;

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function teste(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

aulaRouter.route('/').get(function (req, res) {
  _aula["default"].find({}, function (err, aulas) {
    res.json(aulas);
  });
}).post(function (req, res, next) {
  return (0, _auth["default"])(req, res, next);
}).post(
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var fail, inicioMoment, fimMoment, aulas, turmaColor, aula, sala, turma, professor, horaInicio, dia, i;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!req.body.turma) res.status(400).send("No Turma provided");
            fail = 0;
            inicioMoment = (0, _moment["default"])(req.body.horaInicio, "HH:mm");
            fimMoment = (0, _moment["default"])(req.body.horaFim, "HH:mm");
            aulas = [];
            _context2.next = 7;
            return _turma["default"].findOne({
              nome: req.body.turma
            });

          case 7:
            turmaColor = _context2.sent;
            if (!turmaColor) res.status(400).send("Turma não encontrada no sistema");
            _context2.next = 11;
            return teste(req, res);

          case 11:
            req.body.color = turmaColor.color;

          case 12:
            if (!(inicioMoment.diff(fimMoment, "minutes") < -30)) {
              _context2.next = 29;
              break;
            }

            if (inicioMoment.format("HH:mm") == "09:15" || inicioMoment.format("HH:mm") == "15:15") inicioMoment.add(15, "minutes"); //intervalos

            if (inicioMoment.format("HH:mm") == "12:30") inicioMoment.add(30, "minutes"); //mudança de turno

            req.body.horaInicio = inicioMoment.format("HH:mm");
            aula = new _aula["default"](req.body);
            sala = aula.sala, turma = aula.turma, professor = aula.professor, horaInicio = aula.horaInicio, dia = aula.dia;
            _context2.next = 20;
            return _aula["default"].find({
              "horaInicio": horaInicio,
              "dia": dia,
              'sala': sala
            }).then(function (result) {
              if (!result.length === 0) {
                fail++;
                result.aviso = "local";
                res.status(409).send(result);
                console.log("Colisão de Local Detectada");
              }
            })["catch"](function (err) {
              fail++;
              res.status(405).send(err);
              console.log("Erro");
            });

          case 20:
            if (neutralAulas.includes(turma)) {
              _context2.next = 23;
              break;
            }

            _context2.next = 23;
            return _aula["default"].find({
              "horaInicio": horaInicio,
              "dia": dia,
              'turma': turma
            }).then(function (result) {
              if (!result.length === 0) {
                fail++;
                result.aviso = "turma";
                res.status(409).send(result);
                console.log("Colisão de Turma Detectada");
              }
            })["catch"](function (err) {
              fail++;
              res.status(405).send(err);
              console.log("Erro");
            });

          case 23:
            _context2.next = 25;
            return _aula["default"].find({
              "horaInicio": horaInicio,
              "dia": dia,
              'professor': professor
            }).then(function (result) {
              if (!result.length === 0) {
                fail++;
                result.aviso = "professor";
                res.status(409).send(result);
                console.log("Colisão de Professor Detectada");
              }
            })["catch"](function (err) {
              fail++;
              res.status(405).send(err);
              console.log("Erro");
            });

          case 25:
            inicioMoment.add(45, "minutes");
            aulas.push(aula);
            _context2.next = 12;
            break;

          case 29:
            if (fail == 0) {
              for (i = 0; i < aulas.length; i++) {
                aulas[i].save();
                console.log("Aula criada no sistema");
              }

              console.log("Retornando aula");
              res.status(201).send(aulas);
            }

          case 30:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
aulaRouter.route('/DELETEALL').get(function (req, res) {
  _aula["default"].deleteMany({}, function () {
    res.send("deletado");
  });
});
aulaRouter.route('/:aulaId').put(function (req, res) {
  /*
  req.aula.title = req.body.title;
  req.aula.author = req.body.author;
  req.aula.save()
  res.json(req.aula)
  */
}).patch(function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  for (var p in req.body) {
    req.aula[p] = req.body[p];
  }

  req.aula.save();
  res.json(req.aula);
}) //patch
["delete"](
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            console.log("Trying to delete ".concat(req.params.aulaId));
            _context3.next = 4;
            return _aula["default"].deleteOne({
              _id: req.params.aulaId
            }).then(function () {
              console.log("".concat(req.params.aulaId, " deleted"));
              res.sendStatus(200);
            })["catch"](function () {
              return res.sendStatus(400);
            });

          case 4:
            _context3.next = 9;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](0);
            res.send(_context3.t0);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 6]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
var _default = aulaRouter;
exports["default"] = _default;
//# sourceMappingURL=aulas.js.map