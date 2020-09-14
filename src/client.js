import React from 'react'
import {hydrate} from 'react-dom'
import {Router} from 'react-router-dom';
import App from "./components/app";
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserHistory as createHistory} from 'history';

const history = createHistory();

hydrate(
    <Router history={history}>
        <App/>
    </Router>,
    document.querySelector('#app')
)
