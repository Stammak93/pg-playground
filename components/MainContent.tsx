import dynamic from "next/dynamic";
import { useState } from "react";
import Editor from "./Editor";
import Result from "./Result";
// import component dynamically due to some mismatch issue with SSR
// next js likes to dump 3 pages of errors that make no sense when issues occur
const History = dynamic(() => import("./History"), { ssr: false });
import type { MetaData } from "../variousTypes";


const MainContent = () => {

    const [queryResult, setQueryResult] = useState<(MetaData | string)[]>([]);


    return (
        <main className="main-container">
            <div className="left-content">
                <Editor setQueryResult={setQueryResult} />
                <Result queryResult={queryResult} />
            </div>
            <div className="right-content">
                <History setQueryResult={setQueryResult} />
            </div>
        </main>
    );
};

export default MainContent;