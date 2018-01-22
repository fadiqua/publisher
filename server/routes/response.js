import responseController from '../controllers/responseController';
// import passport from 'passport';
import {jwtAuth, checkPermission, asyncMiddleware } from '../services';

// const requireAuth =  passport.authenticate('jwt',{session:false});

function response(routes) {
    routes.post("/comment", jwtAuth, asyncMiddleware(responseController.post));
    routes.delete("/comment",jwtAuth, checkPermission.isOwner, asyncMiddleware(responseController.delete));
    routes.put("/comment",jwtAuth, checkPermission.isOwner, responseController.update);
    routes.get("/comment/:storyId", asyncMiddleware(responseController.get));
    // routes.get("/comment/:username/stories", asyncMiddleware(responseController.getUserResponses));
    routes.get("/comment/:responseId/response", asyncMiddleware(responseController.getReponseById));
    routes.get("/comment/:responseId/replies", asyncMiddleware(responseController.getReplies));
}

export default response;