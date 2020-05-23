"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFileToBucket = exports.triggerGetFileFromBucket = exports.STORAGE = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _storage = require("@google-cloud/storage");

var _utils = require("./utils");

var STORAGE = new _storage.Storage((0, _utils.getCredentialsConfig)());
exports.STORAGE = STORAGE;

var triggerGetFileFromBucket = function triggerGetFileFromBucket(bucketName, fileName) {
  return STORAGE.bucket(bucketName).file(fileName);
};

exports.triggerGetFileFromBucket = triggerGetFileFromBucket;

var uploadFileToBucket = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var bucketName, filePath;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            bucketName = _ref.bucketName, filePath = _ref.filePath;
            _context.prev = 1;
            console.log("----- START: Upload ".concat(filePath, " to bucket ").concat(bucketName, " -----"));
            _context.next = 5;
            return STORAGE.bucket(bucketName).upload(filePath, {
              gzip: true,
              metadata: {
                cacheControl: "public, max-age=31536000"
              }
            });

          case 5:
            console.log("----- END: Upload ".concat(filePath, " to bucket ").concat(bucketName, " -----"));
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            (0, _utils.processError)(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8]]);
  }));

  return function uploadFileToBucket(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.uploadFileToBucket = uploadFileToBucket;