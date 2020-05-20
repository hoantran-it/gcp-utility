"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ENV_VAR = exports.ENV_VAR = {
    MONGO_CONNECTION: "MONGO_CONNECTION",
    BUCKET_NAME: "BUCKET_NAME",
    PROJECT_ID: "PROJECT_ID",
    PRIVATE_KEY: "PRIVATE_KEY",
    CLIENT_EMAIL: "CLIENT_EMAIL"
};

var LOCAL_DIRECTORY = exports.LOCAL_DIRECTORY = "/tmp";

// FIXME Example schema
var TABLES = exports.TABLES = {
    USER: {
        NAME: "USER",
        SCHEMA: [{ name: 'Name', type: 'STRING', mode: 'REQUIRED' }, { name: 'Age', type: 'INTEGER' }, { name: 'Weight', type: 'FLOAT' }, { name: 'IsMagic', type: 'BOOLEAN' }]
    }
};