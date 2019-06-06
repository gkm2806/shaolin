"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

require("dotenv/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var a = process.env.DATABASE_URL;
console.log("Trying to connect to: ", process.env.DATABASE_URL);

_mongoose["default"].connect("mongodb+srv://deploy:deploy@cluster0-ljd0z.mongodb.net/test?retryWrites=true", {
  useNewUrlParser: true
});

_mongoose["default"].set('useNewUrlParser', true);

_mongoose["default"].set('useFindAndModify', false);

_mongoose["default"].set('useCreateIndex', true);

_mongoose["default"].set('find', false);

var db = _mongoose["default"].connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connected to DB");
});
var _default = db;
exports["default"] = _default;
//# sourceMappingURL=mongoose.js.map