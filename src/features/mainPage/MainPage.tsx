import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "app/store";
import {getStoriesIdsTC} from "app/appSlice";
import {Button} from "@mui/material";
import StoryHeader from "features/mainPage/storyHeader/StoryHeader";

const MainPage = () => {
    const dispatch = useAppDispatch()

    const storiesId = useAppSelector(state => state.app.storiesId).slice(0, 100)

    const onClickManualUpdate = () => dispatch(getStoriesIdsTC())

    useEffect(() => {
        dispatch(getStoriesIdsTC());
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(getStoriesIdsTC());
        }, 60000);

        return () => clearInterval(interval);
    }, []);
    return (
        <div>
            <Button variant={"contained"} onClick={onClickManualUpdate}>Refresh News</Button>
            {storiesId.map(storyId => <StoryHeader key={storyId} storyId={String(storyId)}/>)}
        </div>
    );
};

export default MainPage;