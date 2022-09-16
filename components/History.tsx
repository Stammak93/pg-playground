import type { Dispatch, SetStateAction } from "react";
import CodeMirror from "@uiw/react-codemirror";
import RerunButton from "./RerunButton";
import { sql, PostgreSQL } from "@codemirror/lang-sql";
import type { MetaData } from "../variousTypes";

interface HistoryProps {
    queryHistory: string[];
    setQueryResult: Dispatch<SetStateAction<(MetaData | string)[]>>;
};


// this component will display a list of previously executed queries
// in memory

const History = ({ queryHistory, setQueryResult }: HistoryProps) => {


    const renderQueryHistory = queryHistory.map((entry,index) => {

        return (
            <div key={index} className="query-history__item">
                <RerunButton historyTextValue={entry} setQueryResult={setQueryResult}/>
                <CodeMirror
                    className="query-history__content"
                    value={entry}
                    width="100%"
                    height="auto"
                    minHeight="2em"
                    maxHeight="20em"
                    minWidth="100%"
                    maxWidth="100%"
                    extensions={[sql({ dialect: PostgreSQL})]}
                    readOnly={true}
                />
            </div>
        );
    });


    return (
        <div className="query-history-container">
            <h3 style={{ color: "white", height: "0.5em"}}>Query History</h3>
            {renderQueryHistory}
        </div>
    )
};

export default History;