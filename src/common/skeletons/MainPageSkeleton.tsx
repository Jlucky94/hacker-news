import React from 'react';
import StoryHeaderSkeleton from "common/skeletons/StoryHeaderSkeleton";

const MainPageSkeleton = () => {

    return (
        <>
            {new Array(10).map(()=>{
                return (
                    <StoryHeaderSkeleton/>
                )
            })}
        </>
    );
};

export default MainPageSkeleton;