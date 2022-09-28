import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface iProps {
    selector: string;
    children: ReactNode;
}


const MenuPortal = ({ children, selector}: iProps) => {

    const ref = useRef<null | HTMLElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {

        ref.current = document.querySelector(selector)!;
        setMounted(true)

    },[selector])

    return mounted ? createPortal(children, ref.current!) : null
};

export default MenuPortal;