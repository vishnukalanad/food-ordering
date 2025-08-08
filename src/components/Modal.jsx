import {createPortal} from "react-dom";
import {useEffect, useRef} from "react";

export default function Modal({children, open, onClose, className = ""}) {
    const dialog = useRef()
    useEffect(() => {
        const modal = dialog.current;
        if (open) {
            modal.showModal()
        }

        return () => modal.close();
    }, [open]);

    return createPortal(<dialog ref={dialog} className={`w-full min-h-30 rounded-xl m-auto p-4 backdrop:backdrop-brightness-25 lg:w-4/12 ${className}`} onClose={onClose}>
        {children}
    </dialog>, document.getElementById('modal'))
};