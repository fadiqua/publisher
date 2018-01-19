import likeController from '../controllers/likeController';
// import passport from 'passport';
import { jwtAuth } from '../services';
// import checkPermission from '../services/checkPermissions';

function like(routes) {
    routes.post("/like", jwtAuth, likeController.post);
}

export default like;