import type { Dispatch, SetStateAction } from "react";
import type { ResponseData } from "../variousTypes";


interface ToolbarProps {
    setQueryHistory: Dispatch<SetStateAction<string[] | []>>;
    queryHistory: string[] | [];
    query: string;
    setQueryResult: Dispatch<SetStateAction<unknown[]>>;
};


// this component will execute queris and set state based on server response
const Toolbar = ({ query, setQueryHistory, queryHistory, setQueryResult }: ToolbarProps) => {


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
            let queryDeets = [];

            if(typeof metadata === "number") {
                queryDeets = [`Rows affected: ${metadata}`]
            
            } else if (metadata.rows.length === 0) {
                queryDeets = ["Query was succesful"]
            
            } else {
                queryDeets = metadata.rows;
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
                className="toolbar-container__button"
                onClick={() => sendQuery()}>
                    Execute Query
            </button>
        </div>
    );
};

export default Toolbar;