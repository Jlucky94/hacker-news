import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch} from "app/store";
import {getItemTC} from "app/appSlice";
import {CommentType} from "api/api";
import {Button, Container, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {formatDistance} from "date-fns";
import classes from "features/mainPage/storyHeader/storyPage/comments/comment/Comment.module.css"

type CommentProps = {
    commentId: string

}

const commentBodyStyle = {
    lineHeight: 1,
    fontSize: "0.8rem",
    fontFamily: "Verdana, Geneva, sans-serif",
}

const Comment: FC<CommentProps> = ({commentId}) => {
    const dispatch = useAppDispatch()
    const [commentData, setCommentData] = useState<CommentType>()
    const [showKids, setShowKids] = useState(false)

    const timeAgo = commentData && formatDistance(commentData.time * 1000, new Date(), {addSuffix: true})
    const onClickHandleKids = () => setShowKids(!showKids)

    useEffect(() => {
        dispatch(getItemTC({item: commentId})).then((res) => setCommentData(res.payload as CommentType))
    }, [])

    return commentData ? (
            <Container className={classes.container}>
                <Typography variant="overline">
                    {commentData.by} {timeAgo}
                </Typography>
                <Typography sx={commentBodyStyle} dangerouslySetInnerHTML={{__html: commentData.text}}/>
                {commentData.kids &&
                    <Container style={{display: "flex", alignItems: "center"}}>
                        <ExpandMoreIcon sx={{cursor: 'pointer'}} onClick={onClickHandleKids} color={"primary"}/>
                        <Button
                            onClick={onClickHandleKids}>{showKids ? " Hide" : commentData.kids.length + " Replies"}
                        </Button>
                    </Container>
                }
                <Container style={{marginLeft: 20}}>
                    {commentData.kids && showKids && commentData.kids
                        .map(commentId => <Comment key={commentId} commentId={String(commentId)}/>)}
                </Container>
            </Container>

        )
        :
        <div>'SKELETON OR LAZY LOADING'</div>
        ;
};

export default Comment;