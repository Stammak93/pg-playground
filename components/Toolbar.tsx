import type { Dispatch, SetStateAction } from "react";
import { sendQuery } from "../utility/querying";
import type { QueryObject, MetaData } from "../variousTypes";
import { LIST_TABLES_QUERY_FULL } from "../utility/list-tables-query";
import { useSqlQueryStore } from "../utility/zustand/sql-query-store";
import MenuModal from "./faker-menu/MenuModal";


interface ToolbarProps {
    setQueryResult: Dispatch<SetStateAction<(MetaData | string)[]>>;
};

// this component will execute queries and set state based on server response
const Toolbar = ({ setQueryResult }: ToolbarProps) => {

    // check utility/zustand/sql-query-store for details.
    const sqlQuery = useSqlQueryStore(state => state.sqlQuery);
    const removeQuery = useSqlQueryStore(state => state.removeQuery);
    const updateQueryHistory = useSqlQueryStore(state => state.updateQueryHistory);
    const removeAllQueries = useSqlQueryStore(state => state.removeAllQueries);

    
    const handleListTablesBtnClick = async (): Promise<void> => {

        const result: string[] | QueryObject = await sendQuery(LIST_TABLES_QUERY_FULL);

        if(Array.isArray(result)) {
            setQueryResult(result);
        } else {
            setQueryResult(result.queryDeets);
        }
    };


    const handleQueryBtnClick = async (): Promise<void> => {
        
        if(sqlQuery === "") {
            return;
        }
        
        const result: string[] | QueryObject  = await sendQuery(sqlQuery);

        if(Array.isArray(result)) {
            setQueryResult(result)
        } else {
            updateQueryHistory({query: sqlQuery});
            setQueryResult(result.queryDeets);
        }
        
    };

    return (
        <div className="toolbar-container">
            <button
                className="toolbar-container__button-query tl-btn"
                onClick={() => handleQueryBtnClick()}>
                    Execute Query
            </button>
            <button 
                className="toolbar-container__button-clear tl-btn"
                onClick={() => removeQuery() }>
                    Clear Console
            </button>
            <button 
                className="toolbar-container__button-tables tl-btn" 
                onClick={() => handleListTablesBtnClick()}>
                    List Tables
            </button>
            <button 
                className="toolbar-container__button-history tl-btn"
                onClick={() => removeAllQueries()}>
                    Delete History
            </button>
            <MenuModal />
        </div>
    );
};

export default Toolbar;