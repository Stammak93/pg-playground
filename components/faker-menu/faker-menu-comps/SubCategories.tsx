import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { subCategories } from "../../../utility/faker/sub-categories";

interface SubCategoriesProps {
    mainOption: string;
    subOption: string;
    setSubOption: Dispatch<SetStateAction<string>>;
    setMainOption: Dispatch<SetStateAction<string>>;
}

const SubCategories = ({ mainOption, subOption, setSubOption, setMainOption }: SubCategoriesProps) => {

    
    const renderSubCategories = subCategories[mainOption].map((item,index) => {

        let elClass = "subcategory option"
        if(subOption === item) {
            elClass = "subcategory option active"
        }  

        return <li onClick={() => setSubOption(item)} key={index} className={elClass}>{item}</li>

    })

    const handleBackButton = () => {
        setMainOption("");
        setSubOption("");
    }

    return (
        <div className="faker-subcategories">
            <ul className="faker-list">
                <li onClick={() => handleBackButton()} className="subcategory option">Back</li>
                {renderSubCategories}
            </ul>
        </div>
    )
};

export default SubCategories;
