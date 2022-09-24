import type { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";
import { setupFakeStore } from "../utility/faker/fake-store";

interface FakeDataSelectProps {
    setQuery: Dispatch<SetStateAction<string>>;
}

const FakeDataSelect = ({ setQuery }: FakeDataSelectProps) => {


    const [option, setOption] = useState<string>("none");

    useEffect(() => {

        const handleChange = () => {

            if(option === "store") {
                let fakeStoreData = setupFakeStore();
                setQuery(fakeStoreData);
            } else {
                console.log(option);
                setOption("none")
            }
        }

        if(option !== "none") {
            handleChange();
        }
    },[option])


    return (
        <select onChange={(e) => setOption(e.target.value)} value={option} className="fake-data-select">
            <option className="fake-option" value={"none"}>None</option>
            <option className="fake-option" value={"store"}>Fake Store</option>
            <option className="fake-option" value={"something"}>Fake Something</option>
            <option className="fake-option" value={"another"}>Fake Another</option>
        </select>
    )
};

export default FakeDataSelect;