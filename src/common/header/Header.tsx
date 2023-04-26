import React from 'react';
import {AppBar, IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
import logo from "assets/img/y18.gif"
import {useNavigate} from "react-router";
import HomeOutlined from '@mui/icons-material/HomeOutlined';

const Header = () => {
    const navigate = useNavigate()


    const onClickBackToHome = () => navigate('/')

    return (
        <AppBar position="static" style={{display: "flex"}}>
            <Toolbar style={{backgroundColor: "#ff6600"}}>

                <Tooltip title={'Hacker News'} arrow>
                    <div onClick={onClickBackToHome} style={{display: "flex", cursor: "pointer"}}>
                        <img style={{border: "3px solid white", margin: "5px"}}
                             src={logo}
                             alt=""/>
                        <Typography variant="h6" fontWeight={"bold"} color={"black"}>
                            Hacker News
                        </Typography>
                    </div>
                </Tooltip>

                <Tooltip title={'Go to home page'} arrow>
                    <IconButton color={"inherit"} style={{marginLeft: 'auto'}} onClick={onClickBackToHome}>
                        <HomeOutlined sx={{fontSize: 40}}/>
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
};

export default Header;