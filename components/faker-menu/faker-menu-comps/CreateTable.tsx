import { useState } from "react";

interface CreateFieldObj {
    fieldName: string;
    type: string;
    optionalArg?: string;
};

interface CreateTableObj {
    [key: string]: CreateFieldObj
};


/* 
Not sure if the option to create tables should be a thing.

It adds complexity that someone who wants to practise
building their own queries would want to do themselves
anyway. 

However,

My idea was to have rows which would include 2 input fields for table name
and field name. Then a select with all the possible types
as options. Finally, a conditionally rendered input
that allowed a user to specify eg what a foreign key
refers to or the length of a VARCHAR.

All inputs would go into an object where the top level
would be a [key: string] <---- table name

and fields would be added as object[tablename] = {

    ...object[tablename],

    fieldName: string;
    type: string; <--- referring to type eg. VARCHAR
    optionalArg: string; <----- referring to length of VARCHAR or what foreign key references eg. users(id)
} 

*/

const CreateTable = () => {

    const [table, setTable] = useState("");
    const [field, setField] = useState("");
    const [tableObj, setTableObj] = useState<CreateTableObj>({});


    return (
        <div className="create-table-container">
            <div>
                <input type="text" placeholder="Table Name"></input>
                <input type="text" placeholder="Field Name"></input>
                <select>
                    <option>FLOAT</option>
                    <option>INT</option>
                    <option>VARCHAR</option>
                    <option>REAL</option>
                    <option>UNREAL</option>
                    <option>FAKE</option>
                </select>
            </div>
            <div>
                <button className="create-table__submit">Submit</button>
            </div>
        </div>
    );
};

export default CreateTable;

// className="td-th-overflow" for th and td