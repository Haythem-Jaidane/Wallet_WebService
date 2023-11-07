import express from 'express';
import {
  createMedicalDocument,
  getAllMedicalDocuments,
  getMedicalDocumentById,
  updateMedicalDocument,
  deleteMedicalDocument,
} from '../controllers/medicalDocuments.js';

const router = express.Router();

// Create a new medical document
router.post('/', createMedicalDocument);

// Get a list of all medical documents
router.get('/', getAllMedicalDocuments);

// Get a single medical document by ID
router.get('/:id', getMedicalDocumentById);

// Update a medical document by ID
router.put('/:id', updateMedicalDocument);

// Delete a medical document by ID
router.delete('/:id', deleteMedicalDocument);

export default router;
