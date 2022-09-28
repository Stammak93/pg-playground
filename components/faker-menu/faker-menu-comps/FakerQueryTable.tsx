import { useFakerQueryStore } from "../../../utility/zustand/faker-query-store";


const FakerQueryTable = () => {

    const fakerQueries = useFakerQueryStore((state) => state.fakerQueries);
    const removeFakerQuery = useFakerQueryStore((state) => state.removeFakerQuery);
    const removeFakerSelection = useFakerQueryStore((state) => state.removeFakerSelection);
    
    const handleQueryRemoval = (index: number, tableName: string, fieldName: string) => {
        removeFakerQuery(index)
        removeFakerSelection(tableName+fieldName)
    };
    

    const renderFakerQueries = fakerQueries.map((item, index) => {

        return (
            <tr 
                key={index} 
                onClick={() => handleQueryRemoval(index, item.tableName, item.fieldName)}
                className="load-query__tb-row">
                <td>{item.tableName}</td>
                <td>{item.fieldName}</td>
                <td>{item.targetFunc}</td>
            </tr>
        )
    });

    return (
        <div className="load-query__table">
            <table className="content-table">
                <thead>
                    <tr>
                        <th>Table Name</th>
                        <th>Table Field</th>
                        <th>Faker Function</th>
                    </tr>
                </thead>
                <tbody>
                    {fakerQueries.length > 0 ? renderFakerQueries : null}
                </tbody>
            </table>
        </div>
    )
}

export default FakerQueryTable;