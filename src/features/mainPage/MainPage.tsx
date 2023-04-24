import React, {useEffect} from 'react';
import Story from "features/mainPage/story/Story";
import {useAppDispatch, useAppSelector} from "app/store";
import {getStoriesIdsTC} from "app/appSlice";

const MainPage = () => {
    const dispatch = useAppDispatch()

    const storiesId = useAppSelector(state => state.app.storiesId)

    useEffect(() => {
        dispatch(getStoriesIdsTC())
    }, [])

    return (
        <div>
            {storiesId.map(storyId=><Story storyId={String(storyId)}/>)}
        </div>
    );
};

export default MainPage;