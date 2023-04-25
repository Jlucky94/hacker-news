import React, {FC, useEffect} from 'react';
import {appActions, getItemTC} from "app/appSlice";
import {useAppDispatch, useAppSelector} from "app/store";
import {format} from 'date-fns';
import {Link, Typography} from "@mui/material";
import {StoryType} from "api/api";

type StoryHeaderProps = {
    storyId: string
}

const StoryHeader: FC<StoryHeaderProps> = ({storyId}) => {
    const story = useAppSelector(state => state.app.stories[storyId])
    const dispatch = useAppDispatch()
    const formattedDate = story && format(story.time * 1000, 'dd.MM.yyyy')
    const formattedTime = story && format(story.time * 1000, 'HH:mm:ss')

    useEffect(() => {
        // dispatch(appActions.setStory({story}))
        dispatch(getItemTC({item: storyId}))
            .then((response) => dispatch(appActions.setStory({story: response.payload as StoryType})))
    }, [storyId])


    return story ? (
            <div>
                <Link href={"story/" + storyId} underline={"none"} variant={"h6"}>{story.title}</Link>
                <Typography>Rating: {story.score}</Typography>
                <Typography>Posted by {story.by} {formattedDate} at {formattedTime} </Typography>
                <Typography>Comments: {story.kids ? story.kids.length : 0}</Typography>
            </div>
        )
        :
        <div>'SKELETON OR LAZY LOADING'</div>
};

export default StoryHeader;