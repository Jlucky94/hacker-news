import React from 'react';
import 'app/App.css';
import {useAppDispatch, useAppSelector} from "app/store";
import MainPage from "features/mainPage/MainPage";
import {Route, Routes} from "react-router";
import StoryPage from "features/mainPage/storyPage/StoryPage";
import LoadingBar from "common/linearProgress/LoadingBar";
import Header from "common/header/Header";

const App = () => {
    const isLoading = useAppSelector(state => state.app.status)


    return (
        <div>
            {isLoading === "loading" && <LoadingBar/>}
            <Header/>
            <Routes>
                <Route path={'/'} element={<MainPage/>}/>
                <Route path={'/story/:storyId'} element={<StoryPage/>}/>
            </Routes>
        </div>
    )
}

export default App;
