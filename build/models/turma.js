"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cuid = _interopRequireDefault(require("cuid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var localModel = new Schema({
  id: {
    type: String,
    "default": (0, _cuid["default"])()
  },
  nome: {
    type: String,
    required: true
  },
  color: {
    type: String,
    "default": function _default() {
      return "#000000".replace(/0/g, function () {
        return (~~(Math.random() * 16)).toString(16);
      });
    }
  }
});

var _default2 = _mongoose["default"].model('Turma', localModel);

exports["default"] = _default2;
//# sourceMappingURL=turma.js.map