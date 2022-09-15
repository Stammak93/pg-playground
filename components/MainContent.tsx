import { useState } from "react";
import Editor from "./Editor";
import Result from "./Result";
import History from "./History";
import type { MetaData } from "../variousTypes";


const MainContent = () => {

    const [queryHistory, setQueryHistory] = useState<string[]>([]);
    const [queryResult, setQueryResult] = useState<(MetaData | string)[]>([]);


    return (
        <main className="main-container">
            <div className="left-content">
                <Editor setQueryHistory={setQueryHistory} queryHistory={queryHistory} setQueryResult={setQueryResult}/>
                <Result queryResult={queryResult}/>
            </div>
            <div className="right-content">
                <History queryHistory={queryHistory} setQueryResult={setQueryResult}/>
            </div>
        </main>
    );
};

export default MainContent;