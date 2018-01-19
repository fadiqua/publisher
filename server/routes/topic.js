import topicController from '../controllers/topicController';

function topic(routes) {
    routes.post("/topic", topicController.post);
    routes.get("/topics", topicController.get);
}

export default topic;