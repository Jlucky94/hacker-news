import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "app/store";
import {getStoriesIdsTC} from "app/appSlice";
import {Button, Container, Paper, Typography} from "@mui/material";
import StoryHeader from "features/mainPage/storyHeader/StoryHeader";
import ColorButton from "common/colorButton/ColorButton";

const MainPage = () => {
    const dispatch = useAppDispatch()

    const storiesIds = useAppSelector(state => state.app.storiesId).slice(0, 100)

    const onClickManualUpdate = useCallback(() => {
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
            <Paper style={{
                backgroundColor: "#82828214",
                paddingTop: "15px",
                paddingLeft: "30px",
                paddingRight: "30px",
                height: "100%"
            }}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant={'h5'}>
                        Latest 100 news
                    </Typography>
                    <ColorButton onClick={onClickManualUpdate}>
                        Refresh news
                    </ColorButton>
                </div>
                <hr/>
                {storiesIds.map((storyId, i) =>
                    <StoryHeader key={storyId} storyId={String(storyId)} index={i}/>)}
            </Paper>
        </Container>
    )
}

export default MainPage;