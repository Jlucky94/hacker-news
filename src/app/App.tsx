import React, {useEffect} from 'react';
import 'app/App.css';
import {useAppDispatch} from "app/store";
import {getStoriesIdsTC} from "app/appSlice";
import MainPage from "features/mainPage/MainPage";

const App = () => {
    const dispatch = useAppDispatch()


    return (
        <div>
            <MainPage/>
        </div>
    );
};

export default App;
