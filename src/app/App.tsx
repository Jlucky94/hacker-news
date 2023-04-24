import React, {useEffect} from 'react';
import 'app/App.css';
import {useAppDispatch} from "app/store";
import {getStoriesIdsTC} from "app/appSlice";

const App = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getStoriesIdsTC())
    }, [])
    return (
        <div>
            asdasd
        </div>
    );
};

export default App;
