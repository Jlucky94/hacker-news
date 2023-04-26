import React from 'react';
import {Button, Container, Skeleton, Typography} from "@mui/material";

const CommentSkeleton = () => {
    return (
        <>
            <Typography variant="overline">
                <Skeleton width={'50%'} />
                <Skeleton width={'10%'} />
            </Typography>
            <Typography sx={{ mb: 1 }}>
                <Skeleton height={30} />
                <Skeleton height={30} />
                <Skeleton height={30} />
            </Typography>
            <Container style={{ display: 'flex', alignItems: 'center' }}>
                <Skeleton variant={'circular'} width={20} height={20} />
                <Button size={'small'} disabled>
                    Loading replies
                </Button>
            </Container>
        </>
    );
};

export default CommentSkeleton;