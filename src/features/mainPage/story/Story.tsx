import React, {FC, useEffect, useState} from 'react';
import {API, StoryType} from "api/api";

type StoryProps = {
    id: string
}
const Story: FC<StoryProps> = ({id}) => {
    const [story, setStory] = useState<StoryType>()
    useEffect(() => {
    })
    return (
        <div>

        </div>
    );
};

export default Story;