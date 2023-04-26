import React, {FC, memo, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "redux/store";
import {appActions, getItemTC} from "redux/appSlice";
import {Box, Button, Container, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CommentSkeleton from "common/skeletons/CommentSkeleton";
import {commentAuthorStyle, commentBodyStyle, commentDateStyle} from "styles/styles";
import {getTimeAgo} from "common/utils/date";

type CommentProps = {
    commentId: string
    refreshComments: boolean

}


const Comment: FC<CommentProps> = memo(({commentId, refreshComments}) => {
    const dispatch = useAppDispatch()
    const comment = useAppSelector(state => state.app.comments[commentId])
    const [showKids, setShowKids] = useState(false)

    const timeAgo = comment && getTimeAgo(comment.time)
    const onClickHandleKids = () => setShowKids(!showKids)


    useEffect(() => {
        dispatch(getItemTC({itemId: commentId}))
            .then(() => dispatch(appActions.setComment()))
    }, [refreshComments])

    if (comment?.deleted) {
        return null
    }
    return (
        <Container style={{paddingLeft: 0, marginBottom: '15px'}}>
            {comment ?
                (<>
                    <Typography>
                        <Typography sx={commentAuthorStyle} component={'span'}>
                            {comment.by}
                        </Typography>
                        <Typography sx={commentDateStyle} component={'span'}>
                            {timeAgo}
                        </Typography>
                    </Typography>

                    <Typography sx={commentBodyStyle} dangerouslySetInnerHTML={{__html: comment.text}}/>
                    {comment.kids &&
                        <Box style={{display: "flex", alignItems: "center"}}>
                            <ExpandMoreIcon sx={{cursor: 'pointer'}} onClick={onClickHandleKids} color={"inherit"}/>
                            <Button
                                size={'small'}
                                style={{textTransform: 'none', color: 'black'}}
                                onClick={onClickHandleKids}>
                                {showKids ? " Hide" : (comment.kids.length + (comment.kids.length === 1 ? ' reply' : ' replies'))}
                            </Button>
                        </Box>
                    }
                    <Container style={{marginLeft: 20}}>
                        {comment.kids && showKids && comment.kids
                            .map(commentId => <Comment refreshComments={refreshComments} key={commentId}
                                                       commentId={String(commentId)}/>)}
                    </Container>
                </>)
                :
                <CommentSkeleton/>
            }
        </Container>
    )
})

export default Comment;