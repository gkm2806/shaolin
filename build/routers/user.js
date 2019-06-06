"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireWildcard(require("../models/users"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _auth = _interopRequireDefault(require("../auth/auth"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var UserRouter = _express["default"].Router(); //console.log(Usuarios, UserRouter)


UserRouter.route('/').get(function (req, res) {
  _users["default"].find({}, function (err, users) {
    res.json(users);
  });
}).post(function (req, res, next) {
  return (0, _auth["default"])(req, res, next);
}).post(
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var findUser, Usuario, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _users["default"].findOne({
              username: req.body.username
            }).exec();

          case 3:
            findUser = _context.sent;

            if (!findUser) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(400).send({
              message: "Usuario Já existente"
            }));

          case 6:
            req.body.password = _bcrypt["default"].hashSync(req.body.password, 10);
            Usuario = new _users["default"](req.body);
            _context.next = 10;
            return Usuario.save();

          case 10:
            Usuario.password = undefined;
            console.log("Usuario \"" + req.body.username + "\" criado");
            token = (0, _users.generateToken)({
              id: Usuario._id
            });
            Usuario._doc.token = token;
            res.status(201).send(Usuario._doc);
            _context.next = 21;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.status(500).send(_context.t0);

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 17]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
UserRouter.route('/DELETEALL').get(function (req, res) {
  _users["default"].deleteMany({}, function () {
    res.send("deletado");
  });
});
UserRouter.route('/:id').get(
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var findUser;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _users["default"].findOne({
              _id: req.params.id
            });

          case 2:
            findUser = _context2.sent;
            console.log(findUser._doc);
            if (!findUser) res.status(400).send("No user found with this id");
            res.status(200).send(findUser._doc);

          case 6:
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
UserRouter.route("/login").post(
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _users["default"].findOne({
              username: req.body.username
            }).select('+password');

          case 3:
            user = _context3.sent;

            if (user) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.status(400).send({
              message: "Usuario nao encontrado"
            }));

          case 6:
            if (_bcrypt["default"].compareSync(req.body.password.toString(), user.password)) {
              _context3.next = 9;
              break;
            }

            console.log("invalid password");
            return _context3.abrupt("return", res.status(400).send({
              message: "Senha incorreta"
            }));

          case 9:
            user.password = "";
            console.log(user.username + " conectado");
            res.send({
              username: user.username,
              permission: user.permission,
              id: user._id,
              token: (0, _users.generateToken)({
                id: user._id
              })
            });
            _context3.next = 18;
            break;

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            res.status(500).send(_context3.t0);

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 14]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
var _default = UserRouter;
exports["default"] = _default;
//# sourceMappingURL=user.js.map