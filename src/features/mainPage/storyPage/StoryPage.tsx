import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {useAppDispatch, useAppSelector} from "redux/store";
import {Box, Container, Paper, Typography} from "@mui/material";
import {appActions, getItemTC} from "redux/appSlice";
import Comments from "features/mainPage/storyPage/comments/Comments";
import LongLink from "common/longLink/LongLink";
import StoryPageSkeleton from "common/skeletons/StoryPageSkeleton";
import {commentsCountStyle, storyInfoStyle} from "styles/styles";
import {getDate, getTime} from "common/utils/date";
import ColorButton from "common/colorButton/ColorButton";
import classes from 'features/mainPage/storyPage/StoryPage.module.css'

const StoryPage = () => {
    const dispatch = useAppDispatch()
    const params = useParams()

    const storyId = params.storyId as string

    const story = useAppSelector(state => state.app.stories[storyId])

    const [refreshComments, setRefreshComments] = useState(false);

    const onClickRefreshComments = () => setRefreshComments(prevValue => !prevValue)

    const date = story && getDate(story.time)
    const time = story && getTime(story.time)

    const numComments = story?.descendants ? story.descendants : 0;

    useEffect(() => {
        dispatch(getItemTC({itemId: storyId}))
            .then(() => dispatch(appActions.setStory()))
    }, [storyId, refreshComments])

    return (
        <Container maxWidth={"xl"} className={classes.container}>
            <Paper>
                {story ?
                    (<>
                        <Box style={{display: "flex", justifyContent: "space-between"}}>
                            <Typography variant={"h6"}>
                                {story.title}
                                <Typography component={"span"}>
                                    <LongLink url={story.url}/>
                                </Typography>
                            </Typography>
                            <ColorButton size={"small"} onClick={onClickRefreshComments}>
                                Refresh comments
                            </ColorButton>
                        </Box>

                        <Typography sx={storyInfoStyle}>Posted
                            by {story.by} {date} at {time} </Typography>

                        <Typography sx={commentsCountStyle}>
                            {numComments} {numComments === 1 ? 'comment' : 'comments'}
                        </Typography>

                        {story.kids && <Comments refreshComments={refreshComments} kids={story.kids}/>}
                    </>)
                    :
                    <StoryPageSkeleton/>}
            </Paper>
        </Container>
    )
};

export default StoryPage;