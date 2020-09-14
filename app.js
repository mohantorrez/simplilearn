import express from 'express'
import template from './src/template'
import {renderToString} from "react-dom/server";
import { StaticRouter } from 'react-router-dom';
import {createBrowserHistory as createHistory} from 'history';
import  mongoose from 'mongoose';
import App from "./src/components/app";
import path from 'path'
import React from 'react'
import Promise from 'bluebird';
require('dotenv').config({ silent: true });

const app = express()
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));
const loginApi = require('./api/login');
const registerApi = require('./api/register');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

mongoose.connect(process.env.MONGO_URI, { promiseLibrary: Promise }, (err, db) => {
    if (err) {
        logger.warn(`Failed to connect to the database. ${err.stack}`);
    }
    app.locals.db = db;
    app.listen(process.env.PORT || 3000);

});



app.post('/api/login', jsonParser, loginApi);
app.post('/api/register', jsonParser,registerApi);

app.get('/*', (req, res) => {

    const store = {};
    const url = req.originalUrl || req.url,
        location = url;
    // render the App store static markup ins content variable
    let content = renderToString(
        <StaticRouter location={location}>
            <App />
        </StaticRouter>
    );

    console.log(content);

    const response = template(url, {}, content)
    res.send(response);
});