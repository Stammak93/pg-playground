import type { Dispatch, SetStateAction } from "react";
import type { ResponseData, MetaData } from "../variousTypes";

interface RerunButtonProps {
    historyTextValue: string;
    setQueryResult: Dispatch<SetStateAction<(MetaData | string)[]>>;
}


const RerunButton = ({ historyTextValue, setQueryResult }: RerunButtonProps) => {


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
        
        const response = await fetch("/api/pg", {
            method: "POST",
            body: historyTextValue
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

            setQueryResult(queryDeets);
        
        } else {
            let data: string[] = await response.json();
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