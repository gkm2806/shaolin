"use strict";

var _aula = _interopRequireDefault(require("../models/aula"));

var _moment = _interopRequireDefault(require("moment"));

var _nodeSchedule = _interopRequireDefault(require("node-schedule"));

var _aulas = _interopRequireDefault(require("../routers/aulas"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

console.log("Welcome to aula hell");
var oldAulas = [];

var j = _nodeSchedule["default"].scheduleJob({
  hour: 0,
  minute: 0,
  dayOfWeek: 5
}, function () {
  console.log("PURGIN ALL THE UNHOLY SOU--aulas");

  _aula["default"].find({}, function (err, aulas) {
    var today = _moment["default"].now();

    aulas.forEach(
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(aula) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log(aula);

                if (!(!aula.fixa && (0, _moment["default"])(aula.createdAt, "YYYYMMDDhhmmss", true).diff(today, 'days') < -7)) {
                  _context.next = 6;
                  break;
                }

                aula.past = true;
                console.log("DENTRO DO IF: ", aula);
                _context.next = 6;
                return _aula["default"].findByIdAndUpdate(aula._id, aula);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  });
});
//# sourceMappingURL=THE_PURGER.js.map