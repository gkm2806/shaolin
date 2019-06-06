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
  beacon: {
    type: String,
    "default": null
  }
});

var _default = _mongoose["default"].model('Local', localModel);

exports["default"] = _default;
//# sourceMappingURL=local.js.map