"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cuid = _interopRequireDefault(require("cuid"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var aulaModel = new Schema({
  sala: {
    type: String
  },
  materia: {
    type: String
  },
  turma: {
    type: String
  },
  horaInicio: {
    type: String
  },
  horaFim: {
    type: String
  },
  dia: {
    type: String
  },
  professor: {
    type: String
  },
  createdAt: {
    type: String,
    "default": function _default() {
      return (0, _moment["default"])().format('YYYYMMDDhhmmss');
    }
  },
  createdBy: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  fixa: {
    type: Boolean,
    "default": false
  },
  past: {
    type: Boolean,
    "default": false
  }
});
aulaModel.pre("save", function (next) {
  var today = _moment["default"].now();

  console.log("today: ", today);
  next();
});

var _default2 = _mongoose["default"].model('Aula', aulaModel);

exports["default"] = _default2;
//# sourceMappingURL=aula.js.map