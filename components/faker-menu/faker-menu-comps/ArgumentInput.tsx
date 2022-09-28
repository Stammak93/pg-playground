import { fakerArgumentConvertList } from "../../../utility/faker/faker-argument-convert-list";
import { useFakerQueryStore } from "../../../utility/zustand/faker-query-store";

interface ArgumentInputProps {
    subOption: string;
};


const ArgumentInput = ({ subOption }: ArgumentInputProps) => {

    
    const addToArgObj = useFakerQueryStore((state) => state.addToArgObj);

    const handleInputInput = (index: number, value: string, type: string) => {

        let newValue: string | number = value

        if(type === "number") {
            newValue = parseInt(value)
        }

        addToArgObj({ index, value: newValue })
    };

    const renderArgumentInputs = typeof fakerArgumentConvertList[subOption] !== "undefined" ? 
        fakerArgumentConvertList[subOption].arguments.map((item,index) => {
        
            if(item.type === "string") {
                return (
                    <input 
                        key={index} 
                        className="faker-arg__text-input" 
                        type="text" 
                        onChange={(e) => handleInputInput(index,e.target.value,item.type)}
                        placeholder={item.placeholder}>
                    </input>
                )
            }

            if(item.type === "number") {
                return (
                    <input 
                        key={index} 
                        className="faker-arg__num-input" 
                        type="number"
                        placeholder={item.placeholder}
                        onChange={(e) => handleInputInput(index,e.target.value,item.type)}
                        min="0">
                    </input>
                )
            }

        }) : [];

    return (
        <div className={renderArgumentInputs.length > 0 ? "faker-arg-container" : "disabled"}>
            {renderArgumentInputs}
        </div>
    );
};

export default ArgumentInput;