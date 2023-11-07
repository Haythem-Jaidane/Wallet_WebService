import express from 'express';

import {createPrescription,
    getAllPrescriptions,getPrescriptionById,
    updatePrescription,
    deletePrescription
} from '../controllers/Prescription.js';

const router = express.Router();

router
.route('/')
.post(createPrescription)
.get(getAllPrescriptions);

router.get('/:id', getPrescriptionById);

router.put('/:id', updatePrescription);

router.delete('/:id', deletePrescription);

export default router;
