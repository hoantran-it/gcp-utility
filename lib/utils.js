"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.processError = exports.buildProjection = exports.generateDateWithoutTime = exports.formatDate = exports.generateStartDateEndDateString = exports.getCSVFileName = exports.getCSVFilePath = exports.getCredentialsConfig = exports.getEnvironmentVariable = undefined;

var _constants = require("./constants");

var getEnvironmentVariable = exports.getEnvironmentVariable = function getEnvironmentVariable(key) {
    if (!process.env[key]) {
        throw "Missing " + key + " in environment variable!";
    }
    return process.env[key];
};

var getCredentialsConfig = exports.getCredentialsConfig = function getCredentialsConfig() {
    return {
        projectId: getEnvironmentVariable(_constants.ENV_VAR.PROJECT_ID),
        credentials: {
            client_email: getEnvironmentVariable(_constants.ENV_VAR.CLIENT_EMAIL),
            private_key: Buffer.from(getEnvironmentVariable(_constants.ENV_VAR.PRIVATE_KEY), "base64").toString()
        }
    };
};

var getCSVFilePath = exports.getCSVFilePath = function getCSVFilePath(fileName) {
    return _constants.LOCAL_DIRECTORY + "/" + fileName;
};

var getCSVFileName = exports.getCSVFileName = function getCSVFileName(prefix, startDate, endDate) {
    var _generateStartDateEnd = generateStartDateEndDateString(startDate, endDate),
        startDateString = _generateStartDateEnd.startDateString,
        endDateString = _generateStartDateEnd.endDateString;

    return prefix + "." + startDateString + "." + endDateString + ".csv";
};

var generateStartDateEndDateString = exports.generateStartDateEndDateString = function generateStartDateEndDateString(startDate, endDate) {
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

var formatDate = exports.formatDate = function formatDate(date) {
    var month = "" + (date.getMonth() + 1);
    var day = "" + date.getDate();
    var year = date.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
};

var generateDateWithoutTime = exports.generateDateWithoutTime = function generateDateWithoutTime(dateStr) {
    return new Date(new Date(dateStr).setHours(0, 0, 0, 0));
};

var buildProjection = exports.buildProjection = function buildProjection(fields) {
    var results = {};
    for (var i = 0; i < fields.length; i++) {
        results[fields[i]] = 1;
    }
    return results;
};

var processError = exports.processError = function processError(error) {
    if (error) {
        console.log(error);
        throw error;
    }
};