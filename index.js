'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
let dotenv = require('dotenv');
const app = express();
const router = express.Router();

const db = require('./db');
const routes = require('./routes');
const handlers = require('./middlewares');

const jwt = require('./jwt/handler');

dotenv.config();

routes(router);

app.use(bodyParser.json());
app.use('/', router);

app.use(handlers.notFound);
app.use(handlers.serverError);



app.use(passport.initialize());
app.use(passport.session());

jwt.setPassportStrategy(passport);

app.listen(process.env.PORT || 5000);
module.exports = app;