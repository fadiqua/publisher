import express from 'express';
import user from './user';
import story from './story';
import response from './response';
import topic from './topic';
import uploads from './uploads';
import notifications from './notifications';
import like from './like';
import generic from './generic';

const routes = express();
user(routes);
story(routes);
response(routes);
topic(routes);
uploads(routes);
notifications(routes);
like(routes);
generic(routes);

export default routes;
