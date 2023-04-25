import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {useAppDispatch, useAppSelector} from "app/store";
import {Button, Container, Link, Typography} from "@mui/material";
import {appActions, getItemTC} from "app/appSlice";
import {format} from "date-fns";
import {StoryType} from "api/api";
import Comments from "features/mainPage/storyHeader/storyPage/comments/Comments";
import LongLink from "common/longLink/LongLink";

const StoryPage = () => {
    const dispatch = useAppDispatch()
    const params = useParams()
    const navigate = useNavigate()

    const storyId = params.storyId as string

    const story = useAppSelector(state => state.app.stories[storyId])

    const [refreshComments, setRefreshComments] = useState(false);

    const onClickRefreshComments = () => setRefreshComments(prevValue => !prevValue)
    const onClickBackToHome = () => navigate('/')

    const formattedDate = story && format(story.time * 1000, 'dd.MM.yyyy')
    const formattedTime = story && format(story.time * 1000, 'HH:mm:ss')
    const kidsCount = story?.kids ? story.kids.length : 0

    // const countTotalComments = (commentId: string) => {
    //     dispatch(getItemTC({item: commentId}))
    // }

    useEffect(() => {
        dispatch(getItemTC({item: storyId}))
            .then((response) => dispatch(appActions.setStory({story: response.payload as StoryType})))
    }, [storyId, refreshComments])

    return story ? (
        <Container style={{display: "flex", flexDirection: "column"}}>

            <Button style={{alignSelf: 'end'}} variant={"contained"} onClick={onClickBackToHome}>
                Back to home page
            </Button>

            <Typography variant={"h6"}>
                {story.title}
                <Typography component={"span"}>
                    <LongLink url={story.url}/>
                </Typography>
            </Typography>

            <Typography variant="overline">Posted by {story.by} {formattedDate} at {formattedTime} </Typography>

                <Typography>{kidsCount} comments</Typography>

                <Button style={{alignSelf: 'start'}} onClick={onClickRefreshComments}>Refresh comments</Button>

            {story.kids && <Comments kids={story.kids}/>}

        </Container>
    ) : <div>'SKELETON OR LAZY LOADING'</div>;
};

export default StoryPage;