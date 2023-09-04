import { Button } from "@mui/material";
import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
export const Signing = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [showRegister, setShowRegister] = useState(false);


    const handleShow = (e) => {
        if (e === "showLogin") {
            setShowLogin(true)
            setShowRegister(false)
        }
        // else if (e === "showRegister") {
        //     setShowLogin(false)
        //     setShowRegister(true)
        // }
    }
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className="sign-body">

            <body>
                {showLogin ? <Login handleShow={handleShow} showLogin={showLogin} ></Login> : null}
                {showRegister ? <Register></Register> : null}
            </body>


        </div>
    )

}

