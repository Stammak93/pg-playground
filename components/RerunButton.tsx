import type { Dispatch, SetStateAction } from "react";
import { sendQuery } from "../utility/querying";
import type { QueryObject, MetaData } from "../variousTypes";

interface RerunButtonProps {
    historyTextValue: string;
    setQueryResult: Dispatch<SetStateAction<(MetaData | string)[]>>;
}


const RerunButton = ({ historyTextValue, setQueryResult }: RerunButtonProps) => {


    const handleQueryBtnClick = async (): Promise<void> => {

        const result: string[] | QueryObject = await sendQuery(historyTextValue);

        if(Array.isArray(result)) {
            setQueryResult(result);
        } else {
            setQueryResult(result.queryDeets);
        }
    };

    return (
        <div className="rerun-button-container">
            <button onClick={() => handleQueryBtnClick()} className="rerun-button">Rerun</button>
        </div>
    );
};

export default RerunButton;