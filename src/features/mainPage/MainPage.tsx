import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "redux/store";
import {getStoriesIdsTC} from "redux/appSlice";
import {Box, Container, Paper, Typography} from "@mui/material";
import StoryHeader from "features/mainPage/storyHeader/StoryHeader";
import ColorButton from "common/colorButton/ColorButton";
import classes from './MainPage.module.css'
import MainPageSkeleton from "common/skeletons/MainPageSkeleton";

const MainPage = () => {
    const dispatch = useAppDispatch()

    const storiesIds = useAppSelector(state => state.app.storiesId).slice(0, 100)

    const onClickUpdateStories = useCallback(() => {
        dispatch(getStoriesIdsTC())
    }, [dispatch])

    useEffect(() => {
        dispatch(getStoriesIdsTC())
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(getStoriesIdsTC())
        }, 60000);

        return () => clearInterval(interval)
    }, [])

    return (
        <Container maxWidth={"xl"}>
            {storiesIds.length>0?<Paper>
                <Box className={classes.header}>
                    <Typography variant={'h5'}>
                        Latest 100 news
                    </Typography>
                    <ColorButton onClick={onClickUpdateStories}>
                        Refresh news
                    </ColorButton>
                </Box>
                <hr/>
                {storiesIds.map((storyId, i) =>
                    <StoryHeader key={storyId} storyId={String(storyId)} index={i}/>)}
            </Paper>
            :
                <MainPageSkeleton/>
            }
        </Container>
    )
}

export default MainPage;