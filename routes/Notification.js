import express from 'express';
import {
  createNotification,
  getAllNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
} from '../controllers/Notification.js';

const router = express.Router();

// Create a new medical document
router.post('/', createNotification);

// Get a list of all medical documents
router.get('/', getAllNotifications);

// Get a single medical document by ID
router.get('/:id', getNotificationById);

// Update a medical document by ID
router.put('/:id', updateNotification);

// Delete a medical document by ID
router.delete('/:id', deleteNotification);

export default router;
