"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TABLES = exports.LOCAL_DIRECTORY = exports.ENV_VAR = void 0;
var ENV_VAR = {
  MONGO_CONNECTION: "MONGO_CONNECTION",
  BUCKET_NAME: "BUCKET_NAME",
  PROJECT_ID: "PROJECT_ID",
  PRIVATE_KEY: "PRIVATE_KEY",
  CLIENT_EMAIL: "CLIENT_EMAIL"
};
exports.ENV_VAR = ENV_VAR;
var LOCAL_DIRECTORY = "/tmp"; // FIXME Example schema

exports.LOCAL_DIRECTORY = LOCAL_DIRECTORY;
var TABLES = {
  USER: {
    NAME: "USER",
    SCHEMA: [{
      name: 'Name',
      type: 'STRING',
      mode: 'REQUIRED'
    }, {
      name: 'Age',
      type: 'INTEGER'
    }, {
      name: 'Weight',
      type: 'FLOAT'
    }, {
      name: 'IsMagic',
      type: 'BOOLEAN'
    }]
  }
};
exports.TABLES = TABLES;