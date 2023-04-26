import React from 'react';
import {Skeleton} from "@mui/material";

const StoryHeaderSkeleton = () => {
    return (
        <>
            <Skeleton height={30} width="80%"/>
            <Skeleton height={20} width="60%"/>
            <Skeleton height={20} width="40%"/>
        </>
    );
};

export default StoryHeaderSkeleton;