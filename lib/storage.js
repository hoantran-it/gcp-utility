"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.uploadFileToBucket = exports.triggerGetFileFromBucket = exports.STORAGE = undefined;

var _storage = require("@google-cloud/storage");

var _utils = require("./utils");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var STORAGE = exports.STORAGE = new _storage.Storage((0, _utils.getCredentialsConfig)());

var triggerGetFileFromBucket = exports.triggerGetFileFromBucket = function triggerGetFileFromBucket(bucketName, fileName) {
    return STORAGE.bucket(bucketName).file(fileName);
};

var uploadFileToBucket = exports.uploadFileToBucket = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
        var bucketName = _ref2.bucketName,
            filePath = _ref2.filePath;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;

                        console.log("----- START: Upload " + filePath + " to bucket " + bucketName + " -----");
                        _context.next = 4;
                        return STORAGE.bucket(bucketName).upload(filePath, {
                            gzip: true,
                            metadata: {
                                cacheControl: "public, max-age=31536000"
                            }
                        });

                    case 4:
                        console.log("----- END: Upload " + filePath + " to bucket " + bucketName + " -----");
                        _context.next = 10;
                        break;

                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context["catch"](0);

                        (0, _utils.processError)(_context.t0);

                    case 10:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 7]]);
    }));

    return function uploadFileToBucket(_x) {
        return _ref.apply(this, arguments);
    };
}();