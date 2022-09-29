import { useState } from "react";
import { faker } from "@faker-js/faker";
import type { FakerQuery } from "../../../utility/zustand/faker-query-store";
import { useFakerQueryStore } from "../../../utility/zustand/faker-query-store";
import { useSqlQueryStore } from "../../../utility/zustand/sql-query-store";
import FakerQueryTable from "./FakerQueryTable";


interface InsertQueryObj {
    [key: string]: string; // key is index of each table name, value is table name
}

interface FieldListObjValues {
    fieldName: string;
    origin: string;
    fakerFunc: string;
}

interface FieldListObj {
    [key: string]: FieldListObjValues[]; // key is table name
}

const LoadQuery = () => {

    const [iterations, setIterations] = useState(1);

    const fakerQueries = useFakerQueryStore((state) => state.fakerQueries);
    const updateQuery = useSqlQueryStore((state) => state.updateQuery);
    const fakerSelectionObj = useFakerQueryStore((state) => state.fakerFunctionSelectionObj);
    const removeAllSelections = useFakerQueryStore((state) => state.removeAllFakerSelections);
    const removeAllQueries = useFakerQueryStore((state) => state.removeAllFakerQueries);


    // add each unique table to an array
    const grabTableNames = (fakerQueries: FakerQuery[]): string[] => {
        let tableNames = fakerQueries.map(value => value.tableName).filter((value, index, names) => names.indexOf(value) === index)
        return tableNames;
    };

    // creates an object where each table name is a key and the value is an array of its fields
    // that were provided by the user
    const createFieldListObj = (fakerQueries: FakerQuery[]): FieldListObj => {

        let fieldListObj: FieldListObj = {};

        fakerQueries.forEach((item) => {
            // if undefined setup new array at index and push to it, otherwise push to existing array
            if(typeof fieldListObj[item.tableName] === "undefined") {
                fieldListObj[item.tableName] = []
            } 
            
            fieldListObj[item.tableName].push({
                fieldName: item.fieldName,
                origin: item.origin,
                fakerFunc: item.targetFunc
            });

        });

        return fieldListObj;
    };

    // creates a template query string for each table in the array
    // returns an object with keys that are numbers and values that are query strings
    const baseInsertStringCreator = (tableNames: string[], fieldListObj: FieldListObj): InsertQueryObj => {
        
        let insertQueryObject: InsertQueryObj = {}
        
        tableNames.forEach((name) => {
            let fieldNameList: string[] = []

            if(typeof insertQueryObject[name] === "undefined") {
                insertQueryObject[name] = ``
            }
            
            fieldListObj[name].forEach((item) => {
                fieldNameList.push(item.fieldName);
            })
            
            insertQueryObject[name] = `INSERT INTO ${name} (
                ${fieldNameList.join(",")}
            )\nVALUES `
        });
        
        return insertQueryObject;
    };


    const handleLoadQuery = () => {

        let listItems = fakerQueries.length;
        if(listItems === 0) {
            return;
        }

        let tableNames = grabTableNames(fakerQueries); // list of unique table names
        let fieldlistObj = createFieldListObj(fakerQueries); // an object with table names as keys and values of FieldListObjValues
        let baseInsertStringObj = baseInsertStringCreator(tableNames,fieldlistObj); // object with querystrings as values and table names as keys
        let fullQueryString = ``


        tableNames.forEach((tbName) => {
            fullQueryString += baseInsertStringObj[tbName] + `\n`

            for (let i = 0; i < iterations; i++) {
                let resultArray: string[] = [];
                
                fieldlistObj[tbName].forEach((entry) => {

                    let tempArgList = fakerSelectionObj[tbName+entry.fieldName];
                    // utilise the fact that I can use undefined to 
                    // force default values to be used for functions where 
                    // a user has not provided an argument
                    // this way it's possible for a user to only input the third argument in a function for example
                    let argList: (string | number | undefined)[] = []
                    for(let i = 0; i < 4; i++) {
                        if(typeof tempArgList[i] === "undefined") {
                            argList.push(undefined)
                        } else {
                            argList.push(tempArgList[i])
                        }
                    }

                    let origin = entry.origin.toLowerCase(); // initial user choice in menu eg Address or Commerce
                    let fakerFunc = entry.fakerFunc; // the selected faker function to execute

                    // I can index properties in a class with a string, but Typescript doesn't understand that
                    // because Faker doesn't have [key:string]: something. 
                    // So there is an error displaying here
                    let result: unknown = faker[origin][fakerFunc](...argList);
                    
                    // strings with apostrophes need extra apostrophes
                    // to be considered strings
                    if(typeof result === "string" || Object.prototype.toString.call(result) === "[object Date]") {
                        // this literally tells Typescript it's a string or a Date
                        // otherwise the check fails. I should be able to call .toString()
                        if(result.toString().match(/\w+\'\w+/)) {
                            result = result.split("'").join("''");
                        }
                        resultArray.push(`'${result}'`)
                    
                    } else if(Array.isArray(result)) {
                        resultArray.push(`[${result}]`)
                    
                    } else {
                        resultArray.push(`${result}`)
                    }
                });
                
                if(i + 1 === iterations) {
                    fullQueryString += `(${resultArray.join(",")});\n`
                } else {
                    fullQueryString += `(${resultArray.join(",")}),\n`
                }
            }
        });

        updateQuery(fullQueryString);
    };

    // try/catch might not be necessary here because setting 
    // the input to number doesn't allow the value to go through
    // to the function if it cannot be parsed as a number
    // NICE!!!
    const handleIterationsInput = (value: string) => {

        try {
            // parse as number because javascript is happy with
            // doing calculations with strings
            // including producing a result
            let parsedValue = parseInt(value);
            setIterations(parsedValue);
        } catch (err) {
            console.log(err)
        }
    };

    const handleClearAllClick = () => {
        removeAllSelections();
        removeAllQueries();
    }


    return (
        <>
            <FakerQueryTable />
            <input 
                className="load-query__iterations" 
                type="number" 
                min="1"
                onChange={(e) => handleIterationsInput(e.target.value)}
                placeholder="iterations">
            </input>
            <div className="load-query__btns">
                <button className="load-query__btn" onClick={() => handleLoadQuery()}>Load Query</button>
                <button className="load-query__btn" onClick={() => handleClearAllClick()}>Clear All</button>
            </div>
        </>
    );
};

export default LoadQuery;