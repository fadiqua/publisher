// import passport from 'passport';
import storyController from '../controllers/storyController';
import { jwtAuth, asyncMiddleware } from '../services';

// const requireAuth =  passport.authenticate('jwt',{session:false});

function story(routes) {
  routes.post('/story', jwtAuth, asyncMiddleware(storyController.post));
  routes.put('/story', jwtAuth, asyncMiddleware(storyController.updateStory));
  routes.delete('/story', jwtAuth, asyncMiddleware(storyController.deleteStory));
  routes.get('/popular', asyncMiddleware(storyController.getPopularStories));
  routes.get('/story/:slug', asyncMiddleware(storyController.get));
  routes.get('/story/id/:id', asyncMiddleware(storyController.getById));
  routes.get('/posts', asyncMiddleware(storyController.getAll));
  routes.get('/home', storyController.getHomePageData);
  routes.get('/topic/stories/', storyController.getStoriesByTopic);
  routes.get('/tag/:tag', asyncMiddleware(storyController.getStoriesByTag));
}

export default story;
