import type { Dispatch, SetStateAction } from "react";

interface MenuNavProps {
    userAction: string;
    setUserAction: Dispatch<SetStateAction<string>>;
    setMainOption: Dispatch<SetStateAction<string>>;
    setSubOption: Dispatch<SetStateAction<string>>;
    setOpen: Dispatch<SetStateAction<boolean>>;
}


const MenuNav = ({ userAction, setUserAction, setMainOption, setSubOption, setOpen}: MenuNavProps) => {

    const handleNavClick = (value: string) => {
        setUserAction(value);
        setMainOption("");
        setSubOption("");
    }

    const handleCloseWindowClick = () => {

        if(!open) {
            document.querySelector("#modal")!.classList.remove("disabled")
            setOpen(true)
        } else {
            document.querySelector("#modal")!.classList.add("disabled")
            setOpen(false)
        }
    }

    return (
        <nav className="faker-nav">
            <li className={userAction === "create" ? "nav-active" : ""} 
                onClick={() => handleNavClick("create")}>Create</li>
            <li className={userAction === "insert" ? "nav-active" : ""}
                onClick={() => handleNavClick("insert")}>Insert</li>
            <li className={userAction === "load" ? "nav-active" : ""}
                onClick={() => handleNavClick("load")}>Load</li>
            <li onClick={() => handleCloseWindowClick()}>Close</li>
        </nav>
    );
};

export default MenuNav;