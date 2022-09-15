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
                    <th key={index}>{item}</th>
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
                let values = Object.values(item!).map((value, index) => {
        
                    return (
                        <td key={index}>{value}</td>
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
                <table className="content-table">
                    <thead>
                        <tr>{renderTableHeaders(content)}</tr>
                    </thead>
                    <tbody>
                        {renderTableContent(content)}
                    </tbody>
                </table>
            );
        
        } else {
            
            if(typeof content === "string") {

                return (
                    <p key={index}>{content}</p>
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
            { queryResult.length > 0 ?
                renderedContent
                : 
                <p>Query information will be displayed here</p>
            }
        </div>
    );
};

export default Result;