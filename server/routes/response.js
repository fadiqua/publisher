import responsetController from '../controllers/responsetController';
// import passport from 'passport';
import {jwtAuth, checkPermission, asyncMiddleware } from '../services';

// const requireAuth =  passport.authenticate('jwt',{session:false});

function response(routes) {
    routes.post("/comment", jwtAuth, asyncMiddleware(responsetController.post));
    routes.delete("/comment",jwtAuth, checkPermission.isOwner, asyncMiddleware(responsetController.delete));
    routes.put("/comment",jwtAuth, checkPermission.isOwner, responsetController.update);
    routes.get("/comment/:storyId", asyncMiddleware(responsetController.get));
    routes.get("/comment/:username/stories", asyncMiddleware(responsetController.getUserResponses));
    routes.get("/comment/:responseId/response", asyncMiddleware(responsetController.getReponseById));
    routes.get("/comment/:responseId/replies", asyncMiddleware(responsetController.getReplies));
}

export default response;