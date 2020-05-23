"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processError = exports.buildProjection = exports.generateDateWithoutTime = exports.formatDate = exports.generateStartDateEndDateString = exports.getCSVFileName = exports.getCSVFilePath = exports.getCredentialsConfig = exports.getEnvironmentVariable = void 0;

var _constants = require("./constants");

var getEnvironmentVariable = function getEnvironmentVariable(key) {
  if (!process.env[key]) {
    throw "Missing ".concat(key, " in environment variable!");
  }

  return process.env[key];
};

exports.getEnvironmentVariable = getEnvironmentVariable;

var getCredentialsConfig = function getCredentialsConfig() {
  return {
    projectId: getEnvironmentVariable(_constants.ENV_VAR.PROJECT_ID),
    credentials: {
      client_email: getEnvironmentVariable(_constants.ENV_VAR.CLIENT_EMAIL),
      private_key: Buffer.from(getEnvironmentVariable(_constants.ENV_VAR.PRIVATE_KEY), "base64").toString()
    }
  };
};

exports.getCredentialsConfig = getCredentialsConfig;

var getCSVFilePath = function getCSVFilePath(fileName) {
  return "".concat(_constants.LOCAL_DIRECTORY, "/").concat(fileName);
};

exports.getCSVFilePath = getCSVFilePath;

var getCSVFileName = function getCSVFileName(prefix, startDate, endDate) {
  var _generateStartDateEnd = generateStartDateEndDateString(startDate, endDate),
      startDateString = _generateStartDateEnd.startDateString,
      endDateString = _generateStartDateEnd.endDateString;

  return "".concat(prefix, ".").concat(startDateString, ".").concat(endDateString, ".csv");
};

exports.getCSVFileName = getCSVFileName;

var generateStartDateEndDateString = function generateStartDateEndDateString(startDate, endDate) {
  if (startDate && endDate) {
    return {
      startDateString: startDate,
      endDateString: endDate
    };
  } else {
    // Default range: 7 days
    var _endDate = new Date();

    var _startDate = _endDate.setDate(_endDate.getDate() - 7);

    return {
      startDateString: formatDate(_startDate),
      endDateString: formatDate(_endDate)
    };
  }
};

exports.generateStartDateEndDateString = generateStartDateEndDateString;

var formatDate = function formatDate(date) {
  var month = "" + (date.getMonth() + 1);
  var day = "" + date.getDate();
  var year = date.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
};

exports.formatDate = formatDate;

var generateDateWithoutTime = function generateDateWithoutTime(dateStr) {
  return new Date(new Date(dateStr).setHours(0, 0, 0, 0));
};

exports.generateDateWithoutTime = generateDateWithoutTime;

var buildProjection = function buildProjection(fields) {
  var results = {};

  for (var i = 0; i < fields.length; i++) {
    results[fields[i]] = 1;
  }

  return results;
};

exports.buildProjection = buildProjection;

var processError = function processError(error) {
  if (error) {
    console.log(error);
    throw error;
  }
};

exports.processError = processError;