import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {useAppDispatch, useAppSelector} from "app/store";
import {Button, Container, Link, Paper, Typography} from "@mui/material";
import {appActions, getItemTC} from "app/appSlice";
import {format} from "date-fns";
import {StoryType} from "api/api";
import Comments from "features/mainPage/storyPage/comments/Comments";
import LongLink from "common/longLink/LongLink";
import StoryPageSkeleton from "common/skeletons/StoryPageSkeleton";
import {storyInfoStyle} from "common/styles/styles";
import {getDate, getTime} from "common/utils/date";
import ColorButton from "common/colorButton/ColorButton";

const StoryPage = () => {
    const dispatch = useAppDispatch()
    const params = useParams()

    const storyId = params.storyId as string

    const story = useAppSelector(state => state.app.stories[storyId])

    const [refreshComments, setRefreshComments] = useState(false);

    const onClickRefreshComments = () => setRefreshComments(prevValue => !prevValue)

    const date = story && getDate(story.time)
    const time = story && getTime(story.time)

    useEffect(() => {
        dispatch(getItemTC({itemId: storyId}))
            .then(() => dispatch(appActions.setStory()))
    }, [storyId, refreshComments])

    return (
        <Container maxWidth={"xl"} style={{display: "flex", flexDirection: "column",}}>
            <Paper style={{
                backgroundColor: "#82828214",
                paddingTop: "15px",
                paddingLeft: "30px",
                paddingRight: "30px",
                height: "100%"
            }}>
                {story ?
                    (<>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <Typography variant={"h6"}>
                                {story.title}
                                <Typography component={"span"}>
                                    <LongLink url={story.url}/>
                                </Typography>
                            </Typography>
                            <ColorButton size={"small"} onClick={onClickRefreshComments}>
                                Refresh comments
                            </ColorButton>
                        </div>

                        <Typography sx={storyInfoStyle}>Posted
                            by {story.by} {date} at {time} </Typography>

                        <Typography>{story.descendants} comments</Typography>

                        {story.kids && <Comments kids={story.kids}/>}
                    </>)
                    :
                    <StoryPageSkeleton/>}
            </Paper>
        </Container>
    )
};

export default StoryPage;