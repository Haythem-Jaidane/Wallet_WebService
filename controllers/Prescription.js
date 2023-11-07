import  Prescription from '../models/Prescription.js'; 

  
export const createPrescription = async (req, res) => {
    try {
      const newPrescription = new Prescription(req.body);
      const savedPrescription = await newPrescription.save();
      res.status(201).json(savedPrescription);
    } catch (error) {
      res.status(500).json({ error: 'Could not create Prescription', error });
    }
  };



  export const getAllPrescriptions = async (req, res) => {
    try {
      const prescriptions = await Prescription.find();
      res.status(200).json(prescriptions);
    } catch (error) {
      res.status(500).json({ error: 'Could not fetch Prescriptions' });
    }
  };


  

  export const getPrescriptionById = async (req, res) => {
    try {
      const prescription = await Prescription.findOne({id : req.params.id});
  
      if (!prescription) {
        return res.status(404).json({ error: 'Prescription not found' });
      }
      res.status(200).json(prescription);
    } catch (error) {
      res.status(500).json({ errorMessage: 'Could not fetch prescription', error });
    }
};



  export const updatePrescription = async (req, res) => {
    try {
      const updatedPrescription = await Prescription.findOneAndUpdate({id : req.params.id} , req.body, {
        new: true,//true ==> the update object vs false ==> the object not updated
      });
      res.status(200).json(updatedPrescription);
    } catch (error) {
      res.status(500).json({ error: 'Could not update prescription' });
    }
  };



  export const deletePrescription = async (req, res) => {
    try {
      await Prescription.findOneAndDelete({id: req.params.id});
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Could not delete prescription' });
    }
  };