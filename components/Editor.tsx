import React, { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import Toolbar from "./Toolbar";
import { ViewUpdate } from "@codemirror/view";
import CodeMirror from "@uiw/react-codemirror";
import { sql, PostgreSQL } from "@codemirror/lang-sql";
import type { MetaData } from "../variousTypes";


interface EditorProps {
    setQueryHistory: Dispatch<SetStateAction<string[]>>;
    queryHistory: string[];
    setQueryResult: Dispatch<SetStateAction<(MetaData | string)[]>>;
};

// This component will display a toolbar with a button to execute queries
// as well as an editor to write queries

const Editor = ({ setQueryHistory, queryHistory, setQueryResult }: EditorProps) => {

    const [query, setQuery] = useState("");
    

    const handleUserTyping = React.useCallback((value: string, viewUpdate: ViewUpdate) => {
        setQuery(value);
    },[]);

    return (
        <div id="pg-queries" className="query-input-container">
            <Toolbar query={query} setQueryHistory={setQueryHistory} queryHistory={queryHistory} setQueryResult={setQueryResult} />
            <CodeMirror
                className="editor-container"
                value={query}
                width="100%"
                height="100%"
                minHeight="50%"
                maxHeight="100%"
                minWidth="50%"
                maxWidth="100%"
                extensions={[sql({ dialect: PostgreSQL, upperCaseKeywords: true })]}
                onChange={handleUserTyping}
                style={{ color: "red"}}
            />
        </div>
    );
};

export default Editor;