import { useState } from "react";
import type { SetStateAction, Dispatch } from "react";
import Categories from "./faker-menu-comps/Categories";
import SubCategories from "./faker-menu-comps/SubCategories";
import MenuNav from "./MenuNav";
import FunctionRegister from "./faker-menu-comps/FunctionRegister";
import LoadQuery from "./faker-menu-comps/LoadQuery";

interface MainMenuProps {
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const MainMenu = ({ setOpen }: MainMenuProps) => {

    const [userAction, setUserAction] = useState("create");
    const [mainOption, setMainOption] = useState("");
    const [subOption, setSubOption] = useState("");


    return (
        <div className="faker-menu">
            <MenuNav 
                userAction={userAction} 
                setUserAction={setUserAction} 
                setMainOption={setMainOption} 
                setSubOption={setSubOption}
                setOpen={setOpen}
            />
            {userAction === "insert" &&
                <div className="faker-menu-tree">
                    {!subOption &&
                    <Categories 
                        mainOption={mainOption} 
                        setMainOption={setMainOption}
                        setSubOption={setSubOption}
                    />
                    }
                    {mainOption && !subOption && 
                        <SubCategories 
                            mainOption={mainOption} 
                            subOption={subOption} 
                            setSubOption={setSubOption}
                            setMainOption={setMainOption}
                        />
                    }
                    {subOption &&
                        <FunctionRegister 
                            mainOption={mainOption} 
                            subOption={subOption} 
                            setSubOption={setSubOption}
                        />
                    }
                </div>
            }
            {userAction === "create" && <h3 style={{ color: "white", textAlign: "center"}}>Not implemented yet</h3>}
            {userAction === "load" && <LoadQuery />}
        </div>
    )
};

export default MainMenu;