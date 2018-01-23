import responseController from '../controllers/responseController';
// import passport from 'passport';
import {jwtAuth, checkPermission, asyncMiddleware } from '../services';

// const requireAuth =  passport.authenticate('jwt',{session:false});

function response(routes) {
    routes.post("/response", jwtAuth, asyncMiddleware(responseController.post));
    routes.delete("/response",jwtAuth, checkPermission.isOwner, asyncMiddleware(responseController.delete));
    routes.put("/response",jwtAuth, checkPermission.isOwner, responseController.update);
    routes.get("/response/:storyId", asyncMiddleware(responseController.get));
    // routes.get("/response/:username/stories", asyncMiddleware(responseController.getUserResponses));
    routes.get("/response/:responseId/response", asyncMiddleware(responseController.getReponseById));
    routes.get("/response/:responseId/replies", asyncMiddleware(responseController.getReplies));
}

export default response;