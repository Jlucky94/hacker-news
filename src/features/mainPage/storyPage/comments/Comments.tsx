import React, {FC} from 'react';
import {Container} from "@mui/material";
import Comment from "features/mainPage/storyPage/comments/comment/Comment";

type Props = {
    kids: number[]
    refreshComments: boolean
}

const Comments: FC<Props> = ({kids, refreshComments}) => {

    return (
        <Container style={{width: '70%', marginLeft: 0, paddingLeft: 0}}>
            {kids.map(commentId => <Comment refreshComments={refreshComments} key={commentId}
                                            commentId={String(commentId)}/>)}
        </Container>
    );
};

export default Comments;