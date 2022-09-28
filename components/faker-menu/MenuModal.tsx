import { useState } from "react";
import MainMenu from "./MainMenu";
import MenuPortal from "./MenuPortal";

const MenuModal = () => {

    const [open,setOpen] = useState(false);

    const handleClick = () => {

        if(!open) {
            document.querySelector("#modal")!.classList.remove("disabled")
            setOpen(true)
        } else {
            document.querySelector("#modal")!.classList.add("disabled")
            setOpen(false)
        }

    }

    return (
        <>
            <button 
                className="tl-btn" 
                onClick={() => handleClick()}>
                {!open ? "Open Menu" : "Close Menu"}
            </button>
            {open && (
                <MenuPortal selector={"#modal"} children={<MainMenu setOpen={setOpen}/>}/>
            )}
        </>
    )
};

export default MenuModal;