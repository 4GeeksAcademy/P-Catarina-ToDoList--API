import React, { useState } from "react";

function Theme() {
    const [ darkMode , setDarkMode ] = useState(false)

    function changeTheme(){
        setDarkMode(!darkMode)
    }

    return(
        <>
            <h3 onClick={changeTheme}>
                {/*theme icon*/}
                <i className="fas fa-adjust"></i>
                {/*theme - conditional rendering*/}
                { darkMode === true
                ? document.querySelector("body").setAttribute("data-bs-theme", "dark")
                : document.querySelector("body").setAttribute("data-bs-theme", "light")}
            </h3>
        </>
    )

}

export default Theme