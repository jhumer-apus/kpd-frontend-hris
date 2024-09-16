
import { Autocomplete, Button, FormControl, FormHelperText, TextField } from "@mui/material";
import ViewOBTModal from "../public-components/modals/ViewOBTModal";
import { useEffect, useState } from "react";


export default function Test() {
    const [touch, setTouch] = useState(false);

    const handleMouseEnter = () => {
        setTouch(true);
    };

    const handleMouseLeave = () => {
        setTouch(false);
    };
    useEffect(() => {
        console.log(touch)
    },[touch])
    return (
        <div>
            <p>{touch}</p>
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    width: '200px',
                    height: '200px',
                    backgroundColor: touch ? 'lightblue' : 'lightgrey',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                >
                Hover over me!
            </div>
            <p>touch: {touch? "true": "false"}</p>
        </div>
    )
}