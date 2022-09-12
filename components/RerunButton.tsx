import type { Dispatch, SetStateAction } from "react";
import type { ResponseData } from "../variousTypes";

interface RerunButtonProps {
    entry: string;
    setQueryResult: Dispatch<SetStateAction<any[]>>;
}


const RerunButton = ({ entry, setQueryResult }: RerunButtonProps) => {

    const sendQuery = async (): Promise<void> => {
        
        const response = await fetch("/api/pg", {
            method: "POST",
            body: entry
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

            setQueryResult(queryDeets);
        
        } else {
            let data = await response.json();
            setQueryResult(data);
        }
    };

    return (
        <div className="rerun-button-container">
            <button onClick={() => sendQuery()} className="rerun-button">Rerun</button>
        </div>
    );
};

export default RerunButton;