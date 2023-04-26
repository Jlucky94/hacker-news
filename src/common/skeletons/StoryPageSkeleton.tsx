import React from 'react';
import {Button, Skeleton, Typography} from "@mui/material";

const StoryPageSkeleton = () => {
    return (
        <>
            <Typography variant={'h6'}>
                <Skeleton width={'80%'}/>
                <Typography component={'span'}>
                    <Skeleton width={'50%'}/>
                </Typography>
            </Typography>

            <Typography variant="overline">
                <Skeleton width={'50%'}/>
            </Typography>

            <Typography>
                <Skeleton width={'20%'}/>
                comments
            </Typography>

            <Button size={'small'} style={{alignSelf: 'start'}} disabled>
                Refresh comments
            </Button>

        </>
    );
};

export default StoryPageSkeleton;