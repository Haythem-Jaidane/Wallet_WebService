import { MedicalEquipment, Medication, ParaPharmaceutical } from '../models/Medical_equipment.js'; 

  
export const createMedicalEquipment = async (req, res) => {
    try {
      if(req.body.type == "Medication")
      { 
        const newEquipment = new Medication(req.body);
        const savedEquipment = await newEquipment.save();
        res.status(201).json(savedEquipment);
      }
      else if(req.body.type == "ParaPharmaceutical")
      { 
        const newEquipment = new ParaPharmaceutical(req.body);
        const savedEquipment = await newEquipment.save();
        console.log("new",savedEquipment);
        res.status(201).json(savedEquipment);
      }
        
      
    } catch (error) {
      res.status(500).json({ error: 'Could not create medical equipment' });
    }
  };



  export const getAllMedicalEquipments = async (req, res) => {
    try {
      const equipments = await MedicalEquipment.find();
      res.status(200).json(equipments);
    } catch (error) {
      res.status(500).json({ error: 'Could not fetch medical equipments' });
    }
  };


  

  export const getMedicalEquipmentById = async (req, res) => {
    try {
      const equipment = await MedicalEquipment.findOne({id : req.params.id});
  
      if (!equipment) {
        return res.status(404).json({ error: 'Medical equipment not found' });
      }
      res.status(200).json(equipment);
    } catch (error) {
      res.status(500).json({ errorMessage: 'Could not fetch medical equipment', error });
    }
};


  export const getMedicalEquipmentByName = async (req, res) => {
    try {
      const equipment = await MedicalEquipment.findOne({ name: req.params.name });
      if (!equipment) {
        return res.status(404).json({ error: 'Medical equipment not found' });
      }
  
      res.status(200).json(equipment);
    } catch (error) {
      res.status(500).json({ error: 'Could not fetch medical equipment' });
    }
  };

  export const getMedicalEquipmentByType = async (req, res) => {
    try {
      const equipment = await MedicalEquipment.find({ type: req.params.type });
      if (!equipment) {
        return res.status(404).json({ error: 'Medical equipment not found' });
      }
  
      res.status(200).json(equipment);
    } catch (error) {
      res.status(500).json({ error: 'Could not fetch medical equipment' });
    }
  };




  export const updateMedicalEquipment = async (req, res) => {
    try {
      const updatedEquipment = await MedicalEquipment.findOneAndUpdate({id : req.params.id} , req.body, {
        new: true,//true ==> the update object vs false ==> the object not updated
      });
      res.status(200).json(updatedEquipment);
    } catch (error) {
      res.status(500).json({ error: 'Could not update medical equipment' });
    }
  };

  export const deleteMedicalEquipment = async (req, res) => {
    try {
      await MedicalEquipment.findOneAndDelete({id: req.params.id});
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Could not delete medical equipment' });
    }
  };