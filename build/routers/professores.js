"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _professor = _interopRequireDefault(require("../models/professor"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ProfessorRouter = _express["default"].Router();

ProfessorRouter.route('/').get(function (req, res) {
  _professor["default"].find({}, function (err, professores) {
    res.json(professores);
  });
}).post(
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var professor;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            professor = new _professor["default"](req.body);
            professor.save();
            res.status(201).send(professor);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
ProfessorRouter.route('/DELETEALL').get(function (req, res) {
  _professor["default"].deleteMany({}, function () {
    res.send("deletado");
  });
});
ProfessorRouter.route('/:id').put(function (req, res) {
  /*
  req.Professor.title = req.body.title;
  req.Professor.author = req.body.author;
  req.Professor.save()
  res.json(req.Professor)
  */
}).patch(function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  for (var p in req.body) {
    req.professor[p] = req.body[p];
  }

  req.professor.save();
  res.json(req.professor);
}).get(
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
            return Local.findOne({
              _id: req.params.LocalId
            });

          case 2:
            findUser = _context2.sent;
            if (!findUser) res.status(400).send("Nothing found");
            console.log(findUser._doc);
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
}())["delete"](
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
            _context3.next = 3;
            return _professor["default"].deleteOne({
              _id: req.params.id
            }).then(function () {
              return res.sendStatus(200);
            })["catch"](function () {
              return res.sendStatus(400);
            });

          case 3:
            _context3.next = 8;
            break;

          case 5:
            _context3.prev = 5;
            _context3.t0 = _context3["catch"](0);
            res.send(_context3.t0);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 5]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
var _default = ProfessorRouter;
exports["default"] = _default;
//# sourceMappingURL=professores.js.map