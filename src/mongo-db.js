import {MongoClient} from "mongodb";
import {Parser as CSVParser} from "json2csv";
import write from "write";
import {getEnvironmentVariable, generateStartDateEndDateString, generateDateWithoutTime, buildProjection, processError} from "./utils";
import {ENV_VAR} from "./constants";

export const exportDataToCSV = async ({name, filePath, startDate, endDate, fields = [], createdFieldName}) => {
    try {
        console.log(`----- START: Export ${name} To CSV -----`);
        const url = getEnvironmentVariable(ENV_VAR.MONGO_CONNECTION);
        const client = await MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = client.db();
        const {startDateString, endDateString} = generateStartDateEndDateString(startDate, endDate);
        console.log(`Getting ${name} from ${startDateString} to ${endDateString}`);
        let criteria = {
            [createdFieldName]: {
                $gte: generateDateWithoutTime(startDateString),
                $lt: generateDateWithoutTime(endDateString)
            }
        }
        let data;
        if(fields.length > 0) {
            data = await db.collection(name).find(criteria).project(buildProjection(fields)).toArray();
        } else {
            data = await db.collection(name).find(criteria).toArray();
        }
        await client.close();

        if(data.length > 0) {
            console.log(`Exported ${data.length} records!`);
            const json2csvParser = new CSVParser({ header: true });
            const csvData = json2csvParser.parse(data);
            const csvFile = write.sync(filePath, csvData);
            console.log(`Write to ${csvFile.path} file successfully!`);
        } else {
            // Export empty file and show error message in big query table
            console.log(`No data to export!`);
            const csvFile = write.sync(filePath, "No data to export!");
            console.log(`Write empty ${csvFile.path} file successfully!`);
        }
        console.log(`----- END: Export ${name} To CSV -----`);
    } catch (err) {
        processError(err);
    }
};