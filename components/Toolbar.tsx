import type { Dispatch, SetStateAction } from "react";
import { sendQuery } from "../utility/querying";
import type { QueryObject, MetaData } from "../variousTypes";
import { LIST_TABLES_QUERY_FULL } from "../utility/list-tables-query";
import FakeDataSelect from "./FakeDataSelect";


interface ToolbarProps {
    setQueryHistory: Dispatch<SetStateAction<string[]>>;
    queryHistory: string[];
    query: string;
    setQueryResult: Dispatch<SetStateAction<(MetaData | string)[]>>;
    setQuery: Dispatch<SetStateAction<string>>;
};

// this component will execute queris and set state based on server response
const Toolbar = ({ query, setQueryHistory, queryHistory, setQueryResult, setQuery }: ToolbarProps) => {


    const handleListTablesBtnClick = async (): Promise<void> => {

        const result: string[] | QueryObject = await sendQuery(LIST_TABLES_QUERY_FULL);

        if(Array.isArray(result)) {
            setQueryResult(result);
        } else {
            setQueryResult(result.queryDeets);
        }
    };


    const handleQueryBtnClick = async (): Promise<void> => {
        
        if(query === "") {
            return;
        }
        
        const result: string[] | QueryObject  = await sendQuery(query);

        if(Array.isArray(result)) {
            setQueryResult(result)
        } else {
            setQueryHistory(queryHistory => [...queryHistory, query]);
            setQueryResult(result.queryDeets);
        }
        
    };

    const handleFakeStoreClick = () => {

    }


    return (
        <div className="toolbar-container">
            <button
                className="toolbar-container__button-query tl-btn"
                onClick={() => handleQueryBtnClick()}>
                    Execute Query
            </button>
            <button 
                className="toolbar-container__button-clear tl-btn"
                onClick={() => setQuery("") }>Clear Console
            </button>
            <button 
                className="toolbar-container__button-tables tl-btn" 
                onClick={() => handleListTablesBtnClick()}>
                    List Tables
            </button>
            <FakeDataSelect setQuery={setQuery}/>
        </div>
    );
};

export default Toolbar;