import notificationsController from '../controllers/notificationsController';
import { asyncMiddleware, jwtAuth } from '../services';


function notifications(routes) {
    routes.post("/notifications", jwtAuth, asyncMiddleware(notificationsController.markNotificationAsRead));
    routes.get("/notifications", jwtAuth, asyncMiddleware(notificationsController.getNotifications));
    routes.get("/notifications/:id", jwtAuth, asyncMiddleware(notificationsController.getNotificationById));
    routes.post("/notifications/all", jwtAuth, asyncMiddleware(notificationsController.clearUnreadBadgeCount));
    routes.get("/notifications/unread", jwtAuth, asyncMiddleware(notificationsController.getUnreadCount));

}

export default notifications;