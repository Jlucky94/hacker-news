import React from 'react';
import {AppBar, Toolbar, Typography} from "@mui/material";
import logo from "assets/img/y18.gif"

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar style={{backgroundColor: "#ff6600"}}>
                <img style={{border: "3px solid white", margin: "5px"}} src={logo} alt=""/>
                <Typography variant="h6" fontWeight={"bold"} color={"black"}>
                    Hacker News
                </Typography>

            </Toolbar>
        </AppBar>
    );
};

export default Header;