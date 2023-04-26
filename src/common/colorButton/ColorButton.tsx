import React from 'react';
import {Button, ButtonProps, styled} from "@mui/material";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: "#ffffff",
    textTransform: 'none',
    backgroundColor: "#ff6600",
    '&:hover': {
        backgroundColor: "#e55b00",
    },
}));

export default ColorButton;