import React, {FC} from 'react';
import {Container} from "@mui/material";
import Comment from "features/mainPage/storyPage/comments/comment/Comment";

type Props = {
    kids: number[]
}

const Comments: FC<Props> = ({kids}) => {

    return (
        <Container style={{width: '70%', marginLeft: 0, paddingLeft: 0}}>
                {kids.map(commentId => <Comment key={commentId} commentId={String(commentId)}/>)}
        </Container>
    );
};

export default Comments;