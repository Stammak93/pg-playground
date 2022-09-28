import type { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";
import { setupFakeStore } from "../utility/faker/fake-store";
import { setupFakeSocialMedia } from "../utility/faker/fake-social-media";
import { CLEAR_ALL_TABLES, REMOVE_FAKE_TABLES } from "../utility/list-tables-query";

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
                setOption("none")
                return;
            }

            if(option === "social") {
                let fakeSocialData = setupFakeSocialMedia();
                setQuery(fakeSocialData);
                setOption("none")
                return;
            }

            if(option === "other") {
                let content = REMOVE_FAKE_TABLES;
                setQuery(content);
                setOption("none");
                return;
            }

            if(option === "full") {
                let content = CLEAR_ALL_TABLES;
                setQuery(content);
                setOption("none")
                return;
            }

            setOption("none")
        }

        if(option !== "none") {
            handleChange();
        }

    },[option])


    return (
        <select id="fake-select" onChange={(e) => setOption(e.target.value)} value={option} className="fake">
            <option className="fake-option" value={"none"}>None</option>
            <option className="fake-option" value={"store"}>Fake Store</option>
            <option className="fake-option" value={"social"}>Fake Social Media</option>
            <option className="fake-option" value={"other"}>Clear Tables</option>
            <option className="fake-option" value={"full"}>Clear Tables(All)</option>
        </select>
    )
};

export default FakeDataSelect;