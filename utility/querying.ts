import { ResponseData, MetaData, QueryObject } from "../variousTypes";

// processes the return data when it's a list
const processMetadata = (metadata: MetaData[]) => {
    let returnValue: (MetaData | string)[] = [];
    let pushOnlyOneMsg = false;

    metadata.forEach(item => {
        if(item.rows.length === 0) {
            if(pushOnlyOneMsg === false) {
                returnValue.push("Query was successful")
                pushOnlyOneMsg = true;
            }
        } else {
            returnValue.push(item);
        }
    })
    
    return returnValue
};

// performs the request and checks the data
export const sendQuery = async (query: string): Promise<string[] | QueryObject> => {
    
    const response = await fetch("/api/pg", {
        method: "POST",
        body: query
    });

    if(response.status === 200 || response.status === 201) {
        let { metadata }: ResponseData = await response.json();
        let queryDeets: (MetaData | string)[] = [];

        if(typeof metadata === "number") {
            queryDeets.push(`Rows affected: ${metadata}`)
        
        } else if(Array.isArray(metadata)){
            queryDeets = processMetadata(metadata);
        
        } else {
            if(metadata.rows.length === 0) {
                queryDeets.push("Query was successful")
            } else {
                queryDeets.push(metadata);
            }
        }
        
        return {query, queryDeets};
    
    } else {
        let data: string[] = await response.json();
        return data;
    }
};

// some values such as null and boolean don't show because they are not in a valid
// format. Therefore, I need to change them to strings or numbers
export const processValue = (value: unknown): string | number => {

    let processedValue: string | number = "";

    if(typeof value === "number" || typeof value === "string") {
        processedValue = value
    }

    if(value === null) {
        processedValue = "null"
    }

    if(typeof value === "boolean") {
        value === true ? processedValue = "true" : processedValue = "false";
    }

    // parse the interval type of a postgres query
    if(typeof value === "object") {

        if(value !== null) {
            let tmH = "00";
            let tmM = "00";
            let tmS = "00";
            let days = "";

            for (const [key,val] of Object.entries(value)) {
                
                if(key === "days") {
                    days = Math.abs(val) !== 1 ? `${val} days ` : `${val} day`;
                
                } else if (key === "seconds") {
                    tmS = val > 9 ? `${val}` : `0${val}`;
                
                } else {
                    // I have surprised myself
                    // I have ternaried up to a 100 with this one
                    // it evaluates whether key === string hours, 
                    // then sets hours to value if above 9, so 10:00, 15:00, otherwise 09:00, 05:00 etc.
                    // other otherwise it does this with minutes
                    key === "hours" ? tmH = val > 9 ? `${val}` : `0${val}` : tmM = val > 9 ? `${val}` : `0${val}`;
                }
            }
            
            processedValue = `${days} ${tmH}:${tmM}:${tmS}`;
        }
    }
    return processedValue;
};