import type { Dispatch, SetStateAction } from "react";
import CodeMirror from "@uiw/react-codemirror";
import RerunButton from "./RerunButton";
import { sql, PostgreSQL } from "@codemirror/lang-sql";
import type { MetaData } from "../variousTypes";
import { useSqlQueryStore } from "../utility/zustand/sql-query-store";

interface HistoryProps {
    setQueryResult: Dispatch<SetStateAction<(MetaData | string)[]>>;
};


// this component will display a list of previously executed queries
// with zustand the query history will persist
const History = ({ setQueryResult }: HistoryProps) => {

    const sqlQueryHistory = useSqlQueryStore((state) => state.sqlQueryHistory);
    const removeQueryFromHistory = useSqlQueryStore((state) => state.removeQueryFromHistory);

    const renderQueryHistory = sqlQueryHistory.map((item,index) => {
        return (
            <div key={index} className="query-history__item">
                <RerunButton historyTextValue={item.query} setQueryResult={setQueryResult}/>
                <button 
                    className="rerun-button"
                    onClick={() => removeQueryFromHistory(index)}>F</button>
                <CodeMirror
                    className="query-history__content"
                    value={item.query}
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
        )
    });


    return (
        <div className="query-history-container">
            <h3 className="query-history__title">Query History</h3>
            {renderQueryHistory}
        </div>
    )
};

export default History;