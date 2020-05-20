"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createTableFromStorage = exports.createTable = exports.BIG_QUERY_CLIENT = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _bigquery = require("@google-cloud/bigquery");

var _storage = require("./storage");

var _utils = require("./utils");

var _constants = require("./constants");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var BIG_QUERY_CLIENT = exports.BIG_QUERY_CLIENT = new _bigquery.BigQuery((0, _utils.getCredentialsConfig)());

var getTableSchema = function getTableSchema(tableType) {
    switch (tableType) {
        case _constants.TABLES.USER.NAME:
            return _constants.TABLES.USER.SCHEMA;
        default:
            return [];
    }
};

var createTable = exports.createTable = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dataset, tableName, tableType) {
        var schema, options, _ref2, _ref3, table;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        schema = getTableSchema(tableType);
                        options = {
                            schema: schema,
                            location: "US"
                        };
                        _context.next = 4;
                        return BIG_QUERY_CLIENT.dataset(dataset).createTable(tableName, options);

                    case 4:
                        _ref2 = _context.sent;
                        _ref3 = _slicedToArray(_ref2, 1);
                        table = _ref3[0];

                        console.log("Table " + table.id + " created.");

                    case 8:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function createTable(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

var createTableFromStorage = exports.createTableFromStorage = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref5) {
        var bucketName = _ref5.bucketName,
            fileName = _ref5.fileName,
            dataset = _ref5.dataset,
            tableName = _ref5.tableName,
            writeDisposition = _ref5.writeDisposition;
        var metadata;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;

                        console.log("----- START: Create table " + tableName + " in dataset " + dataset + " from " + fileName + " -----");
                        metadata = {
                            sourceFormat: "CSV",
                            location: "US",
                            autodetect: true,
                            writeDisposition: writeDisposition
                        };
                        _context2.next = 5;
                        return BIG_QUERY_CLIENT.dataset(dataset).table(tableName).load((0, _storage.triggerGetFileFromBucket)(bucketName, fileName), metadata);

                    case 5:
                        console.log("----- END: Create table " + tableName + " in dataset " + dataset + " from " + fileName + " -----");
                        _context2.next = 11;
                        break;

                    case 8:
                        _context2.prev = 8;
                        _context2.t0 = _context2["catch"](0);

                        (0, _utils.processError)(_context2.t0);

                    case 11:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 8]]);
    }));

    return function createTableFromStorage(_x4) {
        return _ref4.apply(this, arguments);
    };
}();