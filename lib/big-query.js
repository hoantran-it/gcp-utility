"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTableFromStorage = exports.createTable = exports.BIG_QUERY_CLIENT = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bigquery = require("@google-cloud/bigquery");

var _storage = require("./storage");

var _utils = require("./utils");

var _constants = require("./constants");

var BIG_QUERY_CLIENT = new _bigquery.BigQuery((0, _utils.getCredentialsConfig)());
exports.BIG_QUERY_CLIENT = BIG_QUERY_CLIENT;

var getTableSchema = function getTableSchema(tableType) {
  switch (tableType) {
    case _constants.TABLES.USER.NAME:
      return _constants.TABLES.USER.SCHEMA;

    default:
      return [];
  }
};

var createTable = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(dataset, tableName, tableType) {
    var schema, options, _yield$BIG_QUERY_CLIE, _yield$BIG_QUERY_CLIE2, table;

    return _regenerator["default"].wrap(function _callee$(_context) {
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
            _yield$BIG_QUERY_CLIE = _context.sent;
            _yield$BIG_QUERY_CLIE2 = (0, _slicedToArray2["default"])(_yield$BIG_QUERY_CLIE, 1);
            table = _yield$BIG_QUERY_CLIE2[0];
            console.log("Table ".concat(table.id, " created."));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createTable(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.createTable = createTable;

var createTableFromStorage = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref2) {
    var bucketName, fileName, dataset, tableName, writeDisposition, metadata;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            bucketName = _ref2.bucketName, fileName = _ref2.fileName, dataset = _ref2.dataset, tableName = _ref2.tableName, writeDisposition = _ref2.writeDisposition;
            _context2.prev = 1;
            console.log("----- START: Create table ".concat(tableName, " in dataset ").concat(dataset, " from ").concat(fileName, " -----"));
            metadata = {
              sourceFormat: "CSV",
              location: "US",
              autodetect: true,
              writeDisposition: writeDisposition
            };
            _context2.next = 6;
            return BIG_QUERY_CLIENT.dataset(dataset).table(tableName).load((0, _storage.triggerGetFileFromBucket)(bucketName, fileName), metadata);

          case 6:
            console.log("----- END: Create table ".concat(tableName, " in dataset ").concat(dataset, " from ").concat(fileName, " -----"));
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](1);
            (0, _utils.processError)(_context2.t0);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 9]]);
  }));

  return function createTableFromStorage(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.createTableFromStorage = createTableFromStorage;