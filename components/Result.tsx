type QueryResult = {
    queryResult: unknown[] | [];
};


const Result = ({ queryResult }: QueryResult) => {


    const renderQueryTableHeaders = () => {

        if(Array.isArray(queryResult)) {
            
            const renderedHeaders = Object.keys(queryResult[0]).map((item,index) => {

                return (
                    <th key={index}>{item}</th>
                );
            });
                
            return renderedHeaders
        }
    }

    const renderQueryTableContent = queryResult.map((item,index) => {

        let values = Object.values(item!).map((value: any,index) => {

            return (
                <td key={index}>{value}</td>
            );
        });
            
        return (
            <tr key={index}>
                {values}
            </tr>
        );
    });


    const renderResultContent = () => {

        if(typeof queryResult[0] !== "string") {
            return (
                <table>
                    <thead>
                        <tr>{renderQueryTableHeaders()}</tr>
                    </thead>
                    <tbody>
                        {renderQueryTableContent}
                    </tbody>
                </table>
            );
        }

        return (
            <p>{queryResult[0]}</p>
        );
    };


    return (
        <div className="query-result-container">
            { queryResult.length > 0 ? 
                renderResultContent()
                : 
                <p>Query information will be displayed here</p>
            }
        </div>
    );
};

export default Result;