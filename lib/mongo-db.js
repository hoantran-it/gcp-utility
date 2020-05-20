"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.exportDataToCSV = undefined;

var _mongodb = require("mongodb");

var _json2csv = require("json2csv");

var _write = require("write");

var _write2 = _interopRequireDefault(_write);

var _utils = require("./utils");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var exportDataToCSV = exports.exportDataToCSV = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
        var name = _ref2.name,
            filePath = _ref2.filePath,
            startDate = _ref2.startDate,
            endDate = _ref2.endDate,
            _ref2$fields = _ref2.fields,
            fields = _ref2$fields === undefined ? [] : _ref2$fields,
            createdFieldName = _ref2.createdFieldName;

        var url, client, db, _generateStartDateEnd, startDateString, endDateString, criteria, data, json2csvParser, csvData, csvFile, _csvFile;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;

                        console.log("----- START: Export " + name + " To CSV -----");
                        url = (0, _utils.getEnvironmentVariable)(_constants.ENV_VAR.MONGO_CONNECTION);
                        _context.next = 5;
                        return _mongodb.MongoClient.connect(url, {
                            useNewUrlParser: true,
                            useUnifiedTopology: true
                        });

                    case 5:
                        client = _context.sent;
                        db = client.db();
                        _generateStartDateEnd = (0, _utils.generateStartDateEndDateString)(startDate, endDate), startDateString = _generateStartDateEnd.startDateString, endDateString = _generateStartDateEnd.endDateString;

                        console.log("Getting " + name + " from " + startDateString + " to " + endDateString);
                        criteria = _defineProperty({}, createdFieldName, {
                            $gte: (0, _utils.generateDateWithoutTime)(startDateString),
                            $lt: (0, _utils.generateDateWithoutTime)(endDateString)
                        });
                        data = void 0;

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
                            console.log("Exported " + data.length + " records!");
                            json2csvParser = new _json2csv.Parser({ header: true });
                            csvData = json2csvParser.parse(data);
                            csvFile = _write2.default.sync(filePath, csvData);

                            console.log("Write to " + csvFile.path + " file successfully!");
                        } else {
                            // Export empty file and show error message in big query table
                            console.log("No data to export!");
                            _csvFile = _write2.default.sync(filePath, "No data to export!");

                            console.log("Write empty " + _csvFile.path + " file successfully!");
                        }
                        console.log("----- END: Export " + name + " To CSV -----");
                        _context.next = 29;
                        break;

                    case 26:
                        _context.prev = 26;
                        _context.t0 = _context["catch"](0);

                        (0, _utils.processError)(_context.t0);

                    case 29:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 26]]);
    }));

    return function exportDataToCSV(_x) {
        return _ref.apply(this, arguments);
    };
}();