import Notification from '../models/notificationModel.js';

// @desc    Get user's notifications
// @route   GET /api/notifications
// @access  Private
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    if (notification.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    notification.read = true;
    await notification.save();

    res.json({ success: true, message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Helper function to create a notification (to be imported by other controllers)
const createNotification = async (userId, title, message, type = 'info', io, targetRoom) => {
  try {
    const notification = new Notification({
      userId,
      title,
      message,
      type
    });
    await notification.save();

    if (io && targetRoom) {
      io.to(targetRoom).emit('notification-created', notification);
    }
  } catch (error) {
    console.error('Error creating notification:', error.message);
  }
};

export { getNotifications, markAsRead, createNotification };
