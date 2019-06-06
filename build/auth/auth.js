"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Auth;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

require("dotenv/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Auth(req, res, next) {
  var authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send({
    error: "No Token"
  });
  var split = authHeader.toString().split(' ');
  if (!split === 2) return res.status(401).send({
    error: "Token Error"
  });

  var _split = _slicedToArray(split, 2),
      word = _split[0],
      token = _split[1];

  if (word !== "Bearer") return res.status(401).send({
    error: "Mas o que *#@!%#! vc ta fazendo?"
  });

  _jsonwebtoken["default"].verify(token, process.env.HASH_SALT, function (err, decoded) {
    if (err) return res.status(401).send({
      error: "Token invalido, boa tentativa!"
    });
    req.body.createdBy = decoded.id;
    return next();
  });
}
//# sourceMappingURL=auth.js.map