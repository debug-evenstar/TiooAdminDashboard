import { useState, useEffect } from "react";

export default function Toast({ message, type, onClose }: { message: string; type: string, onClose: () => void }): JSX.Element {
    const [visible, setVisible] = useState<boolean>(true);
    const [hidden, setHidden] = useState<boolean>(false);
    useEffect(() => {
        let vtimer = 0, htimer = 0;
        vtimer = setTimeout(() => {
            htimer = setTimeout(() => {
                setVisible(false);
            }, 1000)
            setHidden(true);
            onClose();
        }, 3000);
        return () => {
            clearInterval(vtimer)
            clearTimeout(htimer)
        };
    }, []);

    return (
        <>
            {visible &&
                <div className={`${!hidden ? "right-5" : "-right-[24rem]"} ease-out duration-1000 w-[20rem] fixed top-[1rem] right-[1rem] border shadow px-3 py-2 text-xs text-primary h-[4rem] bg-white rounded py-2 border-l-main border-l-[.3rem]`}>
                    <h1>{type}</h1><br/>
                    {message}
                </div>
            }
        </>
    )
}
