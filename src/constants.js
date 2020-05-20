export const ENV_VAR = {
    MONGO_CONNECTION: "MONGO_CONNECTION",
    BUCKET_NAME: "BUCKET_NAME",
    PROJECT_ID: "PROJECT_ID",
    PRIVATE_KEY: "PRIVATE_KEY",
    CLIENT_EMAIL: "CLIENT_EMAIL"
}

export const LOCAL_DIRECTORY = "/tmp";

// FIXME Example schema
export const TABLES = {
    USER: {
        NAME: "USER",
        SCHEMA: [
            {name: 'Name', type: 'STRING', mode: 'REQUIRED'},
            {name: 'Age', type: 'INTEGER'},
            {name: 'Weight', type: 'FLOAT'},
            {name: 'IsMagic', type: 'BOOLEAN'},
        ]
    }
}