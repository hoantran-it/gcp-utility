"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportDataToCSV = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongodb = require("mongodb");

var _json2csv = require("json2csv");

var _write = _interopRequireDefault(require("write"));

var _utils = require("./utils");

var _constants = require("./constants");

var exportDataToCSV = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var name, filePath, startDate, endDate, _ref$fields, fields, createdFieldName, url, client, db, _generateStartDateEnd, startDateString, endDateString, criteria, data, json2csvParser, csvData, csvFile, _csvFile;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            name = _ref.name, filePath = _ref.filePath, startDate = _ref.startDate, endDate = _ref.endDate, _ref$fields = _ref.fields, fields = _ref$fields === void 0 ? [] : _ref$fields, createdFieldName = _ref.createdFieldName;
            _context.prev = 1;
            console.log("----- START: Export ".concat(name, " To CSV -----"));
            url = (0, _utils.getEnvironmentVariable)(_constants.ENV_VAR.MONGO_CONNECTION);
            _context.next = 6;
            return _mongodb.MongoClient.connect(url, {
              useNewUrlParser: true,
              useUnifiedTopology: true
            });

          case 6:
            client = _context.sent;
            db = client.db();
            _generateStartDateEnd = (0, _utils.generateStartDateEndDateString)(startDate, endDate), startDateString = _generateStartDateEnd.startDateString, endDateString = _generateStartDateEnd.endDateString;
            console.log("Getting ".concat(name, " from ").concat(startDateString, " to ").concat(endDateString));
            criteria = (0, _defineProperty2["default"])({}, createdFieldName, {
              $gte: (0, _utils.generateDateWithoutTime)(startDateString),
              $lt: (0, _utils.generateDateWithoutTime)(endDateString)
            });

            if (!(fields.length > 0)) {
              _context.next = 17;
              break;
            }

            _context.next = 14;
            return db.collection(name).find(criteria).project((0, _utils.buildProjection)(fields)).toArray();

          case 14:
            data = _context.sent;
            _context.next = 20;
            break;

          case 17:
            _context.next = 19;
            return db.collection(name).find(criteria).toArray();

          case 19:
            data = _context.sent;

          case 20:
            _context.next = 22;
            return client.close();

          case 22:
            if (data.length > 0) {
              console.log("Exported ".concat(data.length, " records!"));
              json2csvParser = new _json2csv.Parser({
                header: true
              });
              csvData = json2csvParser.parse(data);
              csvFile = _write["default"].sync(filePath, csvData);
              console.log("Write to ".concat(csvFile.path, " file successfully!"));
            } else {
              // Export empty file and show error message in big query table
              console.log("No data to export!");
              _csvFile = _write["default"].sync(filePath, "No data to export!");
              console.log("Write empty ".concat(_csvFile.path, " file successfully!"));
            }

            console.log("----- END: Export ".concat(name, " To CSV -----"));
            _context.next = 29;
            break;

          case 26:
            _context.prev = 26;
            _context.t0 = _context["catch"](1);
            (0, _utils.processError)(_context.t0);

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 26]]);
  }));

  return function exportDataToCSV(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.exportDataToCSV = exportDataToCSV;