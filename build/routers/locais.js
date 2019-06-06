"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _local = _interopRequireDefault(require("../models/local"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var LocalRouter = _express["default"].Router();

LocalRouter.route('/').get(function (req, res) {
  _local["default"].find({}, function (err, locais) {
    res.json(locais);
  });
}).post(
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var local;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            local = new _local["default"](req.body);
            console.log("req: ", req.body);
            console.log("Local: ", local);
            local.save();
            res.status(201).send(local);

          case 5:
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
LocalRouter.route('/DELETEALL').get(function (req, res) {
  _local["default"].deleteMany({}, function () {
    res.send("deletado");
  });
});
LocalRouter.route('/:LocalId').get(
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
            return _local["default"].findOne({
              _id: req.params.LocalId
            });

          case 2:
            findUser = _context2.sent;
            if (!findUser) res.status(400).send("No Local found with this id");
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
}()).patch(function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  for (var p in req.body) {
    req.local[p] = req.body[p];
  }

  req.local.save();
  res.json(req.local);
})["delete"](
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
            return _local["default"].deleteOne({
              _id: req.params.LocalId
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
/***************  B E A C O N S ****************/

LocalRouter.route('/:LocalId/beacon').put(
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var newBeacon, id, update;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            newBeacon = req.body.beacon;
            id = req.params.LocalId;
            update = {
              beacon: newBeacon
            };

            _local["default"].findOneAndUpdate({
              "_id": id
            }, update, {
              "new": true
            }).then(function (local) {
              res.status(202).send(local);
            })["catch"](function () {
              res.status(400);
            });

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
LocalRouter.route('/beacons/:BeaconId').get(
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var beaconLocals;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _local["default"].find({
              beacon: req.params.BeaconId
            });

          case 2:
            beaconLocals = _context5.sent;
            if (!beaconLocals) res.status(400).send("No local found within this beacon range");
            console.log(beaconLocals);
            res.status(200).send(beaconLocals);

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
var _default = LocalRouter;
exports["default"] = _default;
//# sourceMappingURL=locais.js.map