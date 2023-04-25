import React, {FC, useState} from 'react';
import {Container} from "@mui/material";
import Comment from "features/mainPage/storyHeader/storyPage/comments/comment/Comment";
import {useAppDispatch} from "app/store";

type Props = {
    // storyId: string
    kids: number[]
    // refreshComments: boolean
}

const Comments: FC<Props> = ({kids}) => {
    const dispatch = useAppDispatch()

    const [children, setChildren] = useState<number[]>(kids)

    // useEffect(() => {
    //     dispatch(getItemTC({item: storyId})).then((res) => setChildren(res.payload as number[]))
    // }, [refreshComments])
    return (
        <Container style={{marginLeft: 20}}>
            {kids.map(commentId => <Comment key={commentId} commentId={String(commentId)}/>)}
        </Container>
    );
};

export default Comments;