import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "app/App";
import {Provider} from "react-redux";
import {store} from "redux/store";
import {HashRouter} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import {theme} from "styles/theme/theme";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <HashRouter>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </Provider>
    </HashRouter>
);


