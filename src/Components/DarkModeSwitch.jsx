import React, { useState } from "react";
import useDark from "../hooks/useDark";
import { BsMoon, BsSun } from "react-icons/bs";

const DarSwitch = () => {
    const [colorTheme, setTheme] = useDark();
    const [darkSide, setDarkSide] = useState(
        colorTheme === "light" ? true : false
    );

    console.log(darkSide);
    const toggleDarkMode = () => {
        setTheme(colorTheme);
        setDarkSide(!darkSide);
    };
    return (
        <div onClick={toggleDarkMode}>
            {darkSide ? (
                <BsSun color="white" size={25} />
            ) : (
                <BsMoon color="black" size={25} />
            )}
        </div>
    );
};

export default DarSwitch;
