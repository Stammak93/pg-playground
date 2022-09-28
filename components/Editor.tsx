import React from "react";
import type { Dispatch, SetStateAction } from "react";
import Toolbar from "./Toolbar";
import { ViewUpdate } from "@codemirror/view";
import CodeMirror from "@uiw/react-codemirror";
import { sql, PostgreSQL } from "@codemirror/lang-sql";
import type { MetaData } from "../variousTypes";
import { useSqlQueryStore } from "../utility/zustand/sql-query-store";


interface EditorProps {
    setQueryResult: Dispatch<SetStateAction<(MetaData | string)[]>>;
};

// This component will display a toolbar with a buttons to execute queries etc.
// as well as an editor to write queries in
const Editor = ({ setQueryResult }: EditorProps) => {

    const sqlQuery = useSqlQueryStore(state => state.sqlQuery);
    const updateQuery = useSqlQueryStore(state => state.updateQuery);
    

    const handleUserTyping = React.useCallback((value: string, viewUpdate: ViewUpdate) => {
        updateQuery(value);
    },[]);

    return (
        <div id="pg-queries" className="query-input-container">
            <Toolbar setQueryResult={setQueryResult} />
            <CodeMirror
                className="editor-container"
                value={sqlQuery}
                width="100%"
                height="100%"
                minHeight="50%"
                maxHeight="100%"
                minWidth="50%"
                maxWidth="100%"
                extensions={[sql({ dialect: PostgreSQL, upperCaseKeywords: true })]}
                onChange={handleUserTyping}
            />
        </div>
    );
};

export default Editor;