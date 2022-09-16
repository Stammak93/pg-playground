import type { Dispatch, SetStateAction } from "react";
import type { ResponseData, MetaData } from "../variousTypes";


interface ToolbarProps {
    setQueryHistory: Dispatch<SetStateAction<string[]>>;
    queryHistory: string[];
    query: string;
    setQueryResult: Dispatch<SetStateAction<(MetaData | string)[]>>;
    setQuery: Dispatch<SetStateAction<string>>;
};

// this component will execute queris and set state based on server response
const Toolbar = ({ query, setQueryHistory, queryHistory, setQueryResult, setQuery }: ToolbarProps) => {


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


    const sendQuery = async (): Promise<void> => {
        
        if(query === "") {
            return;
        }
        
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

            setQueryHistory(queryHistory => [...queryHistory, query]);
            setQueryResult(queryDeets);
        
        } else {
            let data: string[] = await response.json();
            setQueryResult(data);
        }
    };


    return (
        <div className="toolbar-container">
            <button
                className="toolbar-container__button-query"
                onClick={() => sendQuery()}>
                    Execute Query
            </button>
            <button 
                className="toolbar-container__button-clear"
                onClick={() => setQuery("") }>Clear Console</button>
        </div>
    );
};

export default Toolbar;