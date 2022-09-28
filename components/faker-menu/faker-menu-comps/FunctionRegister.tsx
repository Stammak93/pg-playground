import { faker } from "@faker-js/faker";
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
    const fakerFunctionSelectionObj = useFakerQueryStore((state) => state.fakerFunctionSelectionObj);
    

    const handleBackButtonClick = () => {
        resetArgObj();
        setSubOption("")
    }

    const handleAddSelectionClick = () => {

        if(tableName && fieldName) {

            if(typeof fakerFunctionSelectionObj[tableName+fieldName] !== "undefined") {
                alert(`You are attempting to add multiple values to the same field in a table. Please consider switching to the 'Load' tab and removing the row by clicking on it.`)
                setSubOption("");
                resetArgObj();
                return;
            }

            addFakerQueries({
                tableName: tableName,
                fieldName: fieldName,
                origin: mainOption,
                targetFunc: subOption
            });

            addToFakerSelection({ tableFieldNameCombo: tableName+fieldName, args: fakerArgObj });
            setSubOption("");
            resetArgObj();
        } else {
            alert("Table name and Field name are required.")
        }
    };

    return (
        <div className="function-register">
            <button
                className="function-register__btn back" 
                onClick={() => handleBackButtonClick()}>Back</button>
            <input 
                id="input-tablename" 
                placeholder="Input table name" 
                onChange={(e) => setTableName(e.target.value)}></input>
            <input 
                id="input-fieldname" 
                placeholder="Input field name" 
                onChange={(e) => setFieldName(e.target.value)}></input>
            <ArgumentInput subOption={subOption} />
            <button 
                className="function-register__btn confirm" 
                onClick={() => handleAddSelectionClick()}>Confirm</button>
        </div>
    )
}

export default FunctionRegister;