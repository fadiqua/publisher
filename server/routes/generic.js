import genericController from '../controllers/genericController';
import { asyncMiddleware } from '../services';

function generic(routes) {
    routes.get("/search", asyncMiddleware(genericController.search));
    routes.get("/advancedSearch/", asyncMiddleware(genericController.advancedSearch));
}

export default generic;