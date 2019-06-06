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
  suap: {
    type: String
  },
  nome: {
    type: String,
    required: true
  }
});

var _default = _mongoose["default"].model('Professor', localModel);

exports["default"] = _default;
//# sourceMappingURL=professor.js.map