import {LOCAL_DIRECTORY, ENV_VAR} from "./constants";


export const getEnvironmentVariable = (key) => {
    if(!process.env[key]) {
        throw `Missing ${key} in environment variable!`;
    }
    return process.env[key];
}

export const getCredentialsConfig = () => {
    return {
        projectId: getEnvironmentVariable(ENV_VAR.PROJECT_ID),
        credentials: {
            client_email: getEnvironmentVariable(ENV_VAR.CLIENT_EMAIL),
            private_key: Buffer.from(getEnvironmentVariable(ENV_VAR.PRIVATE_KEY), "base64").toString()
        }
    }
}

export const getCSVFilePath = (fileName) => {
    return `${LOCAL_DIRECTORY}/${fileName}`;
};

export const getCSVFileName = (prefix, startDate, endDate) => {
    let {startDateString, endDateString} = generateStartDateEndDateString(startDate, endDate);
    return `${prefix}.${startDateString}.${endDateString}.csv`;
};

export const generateStartDateEndDateString = (startDate, endDate) => {
    if(startDate && endDate) {
        return {
            startDateString: startDate,
            endDateString: endDate
        }
    } else {
        // Default range: 7 days
        const endDate = new Date();
        const startDate = endDate.setDate(endDate.getDate() - 7);
        return {
            startDateString: formatDate(startDate),
            endDateString: formatDate(endDate)
        }
    }
};

export const formatDate = date => {
    let month = "" + (date.getMonth() + 1);
    let day = "" + date.getDate();
    let year = date.getFullYear();
    if (month.length < 2)
        month = "0" + month;
    if (day.length < 2)
        day = "0" + day;
    return [year, month, day].join("-");
}

export const generateDateWithoutTime = dateStr => {
    return new Date(new Date(dateStr).setHours(0,0,0,0));
}

export const buildProjection = fields => {
    let results = {};
    for(let i = 0; i < fields.length; i++){
        results[fields[i]] = 1;
    }
    return results;
}

export const processError = error => {
    if (error) {
        console.log(error);
        throw error;
    }
}
