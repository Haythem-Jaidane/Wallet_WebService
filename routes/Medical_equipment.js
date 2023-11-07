import express from 'express';

import {createMedicalEquipment,
    getAllMedicalEquipments,getMedicalEquipmentById,getMedicalEquipmentByName,getMedicalEquipmentByType,
    updateMedicalEquipment,
    deleteMedicalEquipment
} from '../controllers/Medical_equipment.js';

const router = express.Router();

router
.route('/')
.post(createMedicalEquipment)
.get(getAllMedicalEquipments);

router.get('/type/:type', getMedicalEquipmentByType);
router.get('/name/:name', getMedicalEquipmentByName);
router.get('/:id', getMedicalEquipmentById);


router.put('/:id', updateMedicalEquipment);

router.delete('/:id', deleteMedicalEquipment);

export default router;
