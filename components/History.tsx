import type { Dispatch, SetStateAction } from "react";
import CodeMirror from "@uiw/react-codemirror";
import RerunButton from "./RerunButton";
import { sql, PostgreSQL } from "@codemirror/lang-sql";

interface HistoryProps {
    queryHistory: string[] | [];
    setQueryResult: Dispatch<SetStateAction<any[]>>;
};


// this component will display a list of previously executed queries
// in memory

const History = ({ queryHistory, setQueryResult }: HistoryProps) => {


    const renderQueryHistory = queryHistory.map((entry,index) => {

        return (
            <div key={index} className="query-history__item">
                <RerunButton entry={entry} setQueryResult={setQueryResult}/>
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
        <div className="query-history-container">{renderQueryHistory}</div>
    )
};

export default History;