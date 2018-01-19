import commentController from '../controllers/commentController';
import passport from 'passport';
import {jwtAuth, checkPermission, asyncMiddleware } from '../services';

const requireAuth =  passport.authenticate('jwt',{session:false});
function comment(routes) {
    routes.post("/comment", requireAuth, asyncMiddleware(commentController.post));
    routes.delete("/comment",jwtAuth, checkPermission.isOwner, asyncMiddleware(commentController.delete));
    routes.put("/comment",jwtAuth, checkPermission.isOwner, commentController.update);
    routes.get("/comment/:storyId", asyncMiddleware(commentController.get));
    routes.get("/comment/:userId/stories", asyncMiddleware(commentController.getUserResponses));
    routes.get("/comment/:responseId/response", asyncMiddleware(commentController.getReponseById));
    routes.get("/comment/:responseId/replies", asyncMiddleware(commentController.getReplies));
}

export default comment;