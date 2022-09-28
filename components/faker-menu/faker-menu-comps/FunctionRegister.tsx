import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { useFakerQueryStore } from "../../../utility/zustand/faker-query-store";
import ArgumentInput from "./ArgumentInput";

interface FunctionExecuterProps {
    mainOption: string;
    subOption: string;
    setSubOption: Dispatch<SetStateAction<string>>;
}

const FunctionRegister = ({ mainOption, subOption, setSubOption }: FunctionExecuterProps) => {

    const [tableName, setTableName] = useState("");
    const [fieldName, setFieldName] = useState("");
    const addFakerQueries = useFakerQueryStore((state) => state.addFakerQuery)
    const fakerArgObj = useFakerQueryStore((state) => state.fakerArgObj);
    const addToFakerSelection = useFakerQueryStore((state) => state.addToFakerSelection);
    const resetArgObj = useFakerQueryStore((state) => state.resetArgObj);
    

    const handleAddSelectionClick = () => {

        if(tableName && fieldName) {
            addFakerQueries({
                tableName: tableName,
                fieldName: fieldName,
                origin: mainOption,
                targetFunc: subOption
            });

            let argList = Object.values(fakerArgObj);
            addToFakerSelection({ tableFieldNameCombo: tableName+fieldName, args: argList });
            setSubOption("");
            resetArgObj();
        }
    }

    return (
        <div className="function-register">
            <button
                className="function-register__btn back" 
                onClick={() => setSubOption("")}>Back</button>
            <input 
                id="input-tablename" 
                placeholder="Input table name" 
                onChange={(e) => setTableName(e.target.value)}></input>
            <input 
                id="input-fieldname" 
                placeholder="Input field name" 
                onChange={(e) => setFieldName(e.target.value)}></input>
            <ArgumentInput subOption={subOption} tableName={tableName} fieldName={fieldName}/>
            <button 
                className="function-register__btn confirm" 
                onClick={() => handleAddSelectionClick()}>Confirm</button>
        </div>
    )
}

export default FunctionRegister;