import userController from '../controllers/userController';
// import passport from 'passport';
import { jwtAuth, asyncMiddleware } from '../services';

// const localAuth = passport.authenticate('local', {session:false});

function user(routes) {
    routes.post("/login", asyncMiddleware(userController.login));
    routes.post("/socialLogin", asyncMiddleware(userController.socialLogin));
    routes.post("/signup", asyncMiddleware(userController.localSignup));
    routes.put("/user", jwtAuth, asyncMiddleware(userController.updateProfile));
    routes.get("/user/me", asyncMiddleware(userController.getMe));
    routes.get("/user/:id", asyncMiddleware(userController.getUserById));
    routes.get("/user/:id/stories", asyncMiddleware(userController.getUserStories));
    routes.post("/follow", jwtAuth, userController.followUser);
    routes.get("/followers/:id", userController.getFollowers);
    routes.get("/followings/:id", userController.getFollowings);


}

export default user;