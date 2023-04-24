import React, {FC, useEffect} from 'react';
import {getStoryTC} from "app/appSlice";
import {useAppDispatch, useAppSelector} from "app/store";

type StoryProps = {
    storyId: string
}

const Story: FC<StoryProps> = ({storyId}) => {
    const story = useAppSelector(state => state.app.stories[storyId])
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(getStoryTC({storyId}))
    },[storyId])
    return (
        <div key={storyId}>
            Hey!This is story title: {story&&story.title}
        </div>
    );
};

export default Story;