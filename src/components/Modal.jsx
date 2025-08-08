import {createPortal} from "react-dom";
import {useEffect, useRef} from "react";

export default function Modal({children, open, className = ""}) {
    const dialog = useRef()
    useEffect(() => {
        const modal = dialog.current;
        if (open) {
            modal.showModal()
        }

        return () => modal.close();
    }, [open]);

    return createPortal(<dialog ref={dialog} className={`w-4/12 min-h-30 rounded-xl m-auto p-4 backdrop:backdrop-brightness-25 ${className}`}>
        {children}
    </dialog>, document.getElementById('modal'))
};