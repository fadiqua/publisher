import db from '../models/index';

const notificationsController = {};

notificationsController.markNotificationAsRead = async (req, res) => {
  const { id } = req.body;
  try {
    if (id) {
      await db.Notifications.findByIdAndUpdate(id, { isClicked: true });
      res.status(200).json({
        success: true,
      });
    } else {
      await db.Notifications.update({ isClicked: false }, {
        isClicked: true,
        isRead: true,
      }, { multiple: true });
      res.status(200).json({
        success: true,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
    });
  }
};
notificationsController.clearUnreadBadgeCount = async (req, res) => {
  try {
    await db.Notifications.update(
      { _to: req.user.id, isRead: false },
      { $set: { isRead: true } },
      { multi: true },
    );
    res.status(200).json({
      success: true,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
    });
  }
};
notificationsController.getUnreadCount = async (req, res) => {
  try {
    const count = await db.Notifications.find({ _to: req.user.id, isRead: false }).count();
    console.log('unreeeeead ', count);
    res.status(200).json({
      success: true,
      count,
    });
  } catch (e) {
    res.status(500).json({
      success: true,
    });
  }
};

notificationsController.getNotifications = async (req, res) => {
  const { page } = req.query;
  try {
    const notifications = await db.Notifications.paginate(
      { _to: req.user.id },
      { sort: { createdAt: -1 }, page: page || 1, limit: 12 },
    );
    res.status(200).json({
      ...notifications,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
    });
  }
};

notificationsController.getNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await db.Notifications.findById(id);
    if (!notification) {
      res.status(403);
    }
    if (req.user.id !== notification._to.toString()) { throw new Error('invalid notification id'); }
    res.status(200).json({
      success: true,
      notification,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      error: e.message,
    });
  }
};

export default notificationsController;
