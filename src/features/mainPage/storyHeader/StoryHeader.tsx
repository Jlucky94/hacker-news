import React, {FC, memo, useEffect} from 'react';
import {appActions, getItemTC} from "redux/appSlice";
import {useAppDispatch, useAppSelector} from "redux/store";
import {Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {getDate, getTime} from "common/utils/date";
import StoryHeaderSkeleton from "common/skeletons/StoryHeaderSkeleton";
import {storyHeaderStyle, storyInfoStyle} from "styles/styles";

type StoryHeaderProps = {
    storyId: string
    index: number
}

const StoryHeader: FC<StoryHeaderProps> = memo(({storyId, index}) => {
    const story = useAppSelector(state => state.app.stories[storyId])

    const dispatch = useAppDispatch()

    const date = story && getDate(story.time)
    const time = story && getTime(story.time)

    const numComments = story?.kids ? story.kids.length : 0;

    useEffect(() => {
        dispatch(getItemTC({itemId: storyId}))
            .then(() => dispatch(appActions.setStory()))
    }, [storyId])


    return (
        <div style={{marginTop: "10px"}}>
            {story ? (
                    <>
                        <Link to={"story/" + storyId} style={storyHeaderStyle}>
                            {index + 1}. {story.title}
                        </Link>
                        <Typography sx={storyInfoStyle}>
                            {story.score > 1 ? `${story.score} points ` : `${story.score} point `}
                            by {story.by} {date} at {time}
                        </Typography>
                        <Typography sx={storyInfoStyle}>
                            {numComments} {numComments === 1 ? 'comment' : 'comments'}
                        </Typography>
                    </>
                )
                :
                <StoryHeaderSkeleton/>}
        </div>
    )
})

export default StoryHeader;