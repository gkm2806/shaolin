"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateToken = generateToken;
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

require("dotenv/config");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;

function generateToken() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _jsonwebtoken["default"].sign(params, process.env.HASH_SALT, {
    expiresIn: 86400
  });
}

var usuariosModel = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  permission: {
    type: Number,
    "default": 1
  }
});
usuariosModel.pre('save', function (next) {
  console.log("criando Usuario");
  next();
});

var _default = _mongoose["default"].model('Usuarios', usuariosModel);

exports["default"] = _default;
//# sourceMappingURL=users.js.map