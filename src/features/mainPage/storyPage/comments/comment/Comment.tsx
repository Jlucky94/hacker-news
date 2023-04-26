import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch} from "app/store";
import {getItemTC} from "app/appSlice";
import {CommentType} from "api/api";
import {Button, Container, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {formatDistance} from "date-fns";
import classes from "features/mainPage/storyPage/comments/comment/Comment.module.css"
import CommentSkeleton from "common/skeletons/CommentSkeleton";
import {commentAuthorStyle, commentBodyStyle, commentDateStyle} from "common/styles/styles";

type CommentProps = {
    commentId: string

}


const Comment: FC<CommentProps> = ({commentId}) => {
    const dispatch = useAppDispatch()
    const [commentData, setCommentData] = useState<CommentType>()
    const [showKids, setShowKids] = useState(false)

    const timeAgo = commentData && formatDistance(commentData.time * 1000, new Date(), {addSuffix: true})
    const onClickHandleKids = () => setShowKids(!showKids)

    useEffect(() => {
        dispatch(getItemTC({itemId: commentId})).then((res) => setCommentData(res.payload as CommentType))
    }, [])

    return (
        <Container style={{paddingLeft: 0, marginBottom: '15px'}}>
            {commentData ?
                (<>
                    <Typography>
                        <Typography sx={commentAuthorStyle} component={'span'}>
                            {commentData.by}
                        </Typography>
                        <Typography component={'span'}  sx={commentDateStyle}>{timeAgo}</Typography>
                    </Typography>

                    <Typography sx={commentBodyStyle} dangerouslySetInnerHTML={{__html: commentData.text}}/>
                    {commentData.kids &&
                        <Container style={{display: "flex", alignItems: "center"}}>
                            <ExpandMoreIcon sx={{cursor: 'pointer'}} onClick={onClickHandleKids} color={"inherit"}/>
                            <Button size={'small'} style={{textTransform: 'none',color:'black'}}
                                    onClick={onClickHandleKids}>{showKids ? " Hide" : commentData.kids.length + " Replies"}
                            </Button>
                        </Container>
                    }
                    <Container style={{marginLeft: 20}}>
                        {commentData.kids && showKids && commentData.kids
                            .map(commentId => <Comment key={commentId} commentId={String(commentId)}/>)}
                    </Container>
                </>)
                :
                <CommentSkeleton/>
            }
        </Container>
    )
}

export default Comment;