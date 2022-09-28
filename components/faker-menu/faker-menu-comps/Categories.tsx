import type { Dispatch, SetStateAction } from "react";
import { mainCategories } from "../../../utility/faker/main-categories";

interface CategoriesProps {
    mainOption: string;
    setMainOption: Dispatch<SetStateAction<string>>;
    setSubOption: Dispatch<SetStateAction<string>>;
}

const Categories = ({ mainOption, setMainOption, setSubOption}: CategoriesProps) => {


    const handleClickMainOption = (item: string) => {
        setMainOption(item);
        setSubOption("");
    }

    const renderMainCategories = mainCategories.map((item,index) => {

        let elClass = "category option"
        if(mainOption === item) {
            elClass = "category option active"
        }   

        return <li onClick={() => handleClickMainOption(item)} key={index} className={elClass}>{item}</li>
    })

    return (
        <div className="faker-categories">
            <ul className="faker-list">
                {renderMainCategories}
            </ul>
        </div>
    )
}

export default Categories;