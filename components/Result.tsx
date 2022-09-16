import type { MetaData } from "../variousTypes";

interface QueryResult {
    queryResult: (MetaData | string)[];
};

const Result = ({ queryResult }: QueryResult) => {

    // maps keys of rows 
    const renderTableHeaders = (content: MetaData) => {
        
        if(typeof content !== "string" && content.rows.length > 0) {
            // rows is never going to be empty and I only need the keys once
            const renderHeaders = Object.keys(content.rows[0]!).map((item,index) => {
        
                return (
                    <th key={`${index}${item}`}>{item}</th>
                );
            });
                    
            return renderHeaders;
        }

        return null
    }

    // maps values of rows
    const renderTableContent = (content: MetaData) => {
        
        if(typeof content !== "string" && content.rows.length > 0) {

            const renderContent = content.rows.map((item,index) => {
                let values = Object.values(item!).map((value: string | number | null, index) => {
        
                    return (
                        <td key={`${index}${value}`}>{value === null ? "NULL" : value}</td>
                    );
                });
                    
                return (
                    <tr key={index}>
                        {values}
                    </tr>
                )
            })
            return renderContent;
        }
        return null;
    }

    // decides whether to render a table or a p tag message based on queryResult content
    const renderResultContent = (content: MetaData | string, index: number) => {

        if(typeof content !== "string") {

            return (
                <table key={`${index}_table`} className="content-table">
                    <thead key={`${index}_h`}>
                        <tr key={`${index}_tr`}>{renderTableHeaders(content)}</tr>
                    </thead>
                    <tbody key={`${index}_b`}>
                        {renderTableContent(content)}
                    </tbody>
                </table>
            );
        
        } else {

            if(typeof content === "string") {

                return (
                    <p className="query-info" key={`${index}_${content}`}>{content}</p>
                );
            }
        }

        return null;
    };

    
    const renderedContent = queryResult.map((content,index) => {
        

        return (
            renderResultContent(content,index)
        )
    });


    return (
        <div className="query-result-container">
            <h3 style={{ color: "white", height: "0.1em", margin: "0.4em", textAlign: "center"}}>Query Result</h3>
            { queryResult.length > 0 ?
                renderedContent
                : 
                null
            }
        </div>
    );
};

export default Result;