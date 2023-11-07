import Notification from "../models/Notification.js";


// Create a new notification
const createNotification = async (req, res) => {
    try {
        const newNotification = new Notification(req.body);
        console.log(newNotification);
        const saved =  await newNotification.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create a new notification' });
    }
};

// Get a list of all notifications
const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
};

// Get a single notification by ID
const getNotificationById = async (req, res) => {
    try {
        const notification = await Notification.findOne({ id: req.params.id });
        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notification' });
    }
};

// Update a notification by ID
const updateNotification = async (req, res) => {
    try {
        const updatedNotification = await Notification.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        console.log("test")
        if (!updatedNotification) {
            return res.status(404).json({ error: 'Notification not found' });
        }
        res.status(200).json(updatedNotification);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update notification' });
    }
};

// Delete a notification by ID
const deleteNotification = async (req, res) => {
    try {
        const deletedNotification = await Notification.findOneAndDelete({ id: req.params.id });
        if (!deletedNotification) {
            return res.status(404).json({ error: 'Notification not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete notification' });
    }
};

export {
    createNotification,
    getAllNotifications,
    getNotificationById,
    updateNotification,
    deleteNotification,
};
