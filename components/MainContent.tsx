import { useState } from "react";
import Editor from "./Editor";
import Result from "./Result";
import History from "./History";


const MainContent = () => {

    const [queryHistory, setQueryHistory] = useState<string[] | []>([]);
    const [queryResult, setQueryResult] = useState<unknown[]| []>([]);


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