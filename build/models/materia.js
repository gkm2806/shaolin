"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var materiaModel = new _mongoose["default"].Schema({
  apelido: {
    type: String,
    required: true
  },
  nome: {
    type: String,
    required: true
  }
});

var _default = _mongoose["default"].model('Materia', materiaModel);

exports["default"] = _default;
//# sourceMappingURL=materia.js.map