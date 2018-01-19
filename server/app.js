/**
 * Created by fadiqua on 28/05/17.
 */
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import routes from './routes/index';
import { localLogin, jwtLogin, decodeSub } from './services';

require('dotenv').config();

const app = express();

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// body parser
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// passport config
app.use(passport.initialize());
passport.use(localLogin);
passport.use(jwtLogin);
app.use(decodeSub);

// static files
app.use('/media', express.static('files'));
// api
app.use('/api', routes);
// process.env.NODE_ENV = 'production'
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.resolve(__dirname, '..','build')));
    app.use('/media', express.static('files'));
}
if(process.env.NODE_ENV === 'production'){
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..','build','index.html'));
    });
}

export default app;