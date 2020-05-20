import {BigQuery} from "@google-cloud/bigquery";
import {triggerGetFileFromBucket} from "./storage";
import {processError, getEnvironmentVariable, getCredentialsConfig} from "./utils";
import { TABLES, ENV_VAR} from "./constants";


export const BIG_QUERY_CLIENT = new BigQuery(getCredentialsConfig());

const getTableSchema = (tableType) => {
    switch (tableType) {
        case TABLES.USER.NAME:
            return TABLES.USER.SCHEMA;
        default:
            return [];
    }
}

export const createTable = async (dataset, tableName, tableType) => {
    const schema = getTableSchema(tableType);
    const options = {
        schema,
        location: "US",
    };
    const [table] = await BIG_QUERY_CLIENT
        .dataset(dataset)
        .createTable(tableName, options);
    console.log(`Table ${table.id} created.`);
};


export const createTableFromStorage = async ({bucketName, fileName, dataset, tableName, writeDisposition}) => {
    try {
        console.log(`----- START: Create table ${tableName} in dataset ${dataset} from ${fileName} -----`);
        const metadata = {
            sourceFormat: "CSV",
            location: "US",
            autodetect: true,
            writeDisposition: writeDisposition
        };
        await BIG_QUERY_CLIENT
            .dataset(dataset)
            .table(tableName)
            .load(triggerGetFileFromBucket(bucketName, fileName), metadata);
        console.log(`----- END: Create table ${tableName} in dataset ${dataset} from ${fileName} -----`);
    } catch (err) {
        processError(err);
    }
};