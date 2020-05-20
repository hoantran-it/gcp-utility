import {Storage} from "@google-cloud/storage";
import {getCredentialsConfig, processError} from "./utils";

export const STORAGE = new Storage(getCredentialsConfig());

export const triggerGetFileFromBucket = (bucketName, fileName) => {
    return STORAGE.bucket(bucketName).file(fileName);
};

export const uploadFileToBucket = async ({bucketName, filePath}) => {
    try {
        console.log(`----- START: Upload ${filePath} to bucket ${bucketName} -----`);
        await STORAGE.bucket(bucketName).upload(filePath, {
            gzip: true,
            metadata: {
                cacheControl: "public, max-age=31536000",
            },
        });
        console.log(`----- END: Upload ${filePath} to bucket ${bucketName} -----`);
    } catch (err) {
        processError(err);
    }
};
