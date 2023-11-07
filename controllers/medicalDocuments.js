import MedicalDocuments from "../models/MedicalDocuments.js";
// Create a new medical document
const createMedicalDocument = async (req, res) => {
    try {
      const newMedicalDocument = new MedicalDocuments(req.body);
      console.log(newMedicalDocument);
      const saved =  await newMedicalDocument.save();
     // console.log("saved:",saved)
      res.status(201).json(saved);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create a new medical document' });
    }
  };
  

// Get a list of all medical documents
const getAllMedicalDocuments = async (req, res) => {
    try {
      const medicalDocuments = await MedicalDocuments.find();
      res.status(200).json(medicalDocuments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch medical documents' });
    }
  };

// Get a single medical document by ID
const getMedicalDocumentById = async (req, res) => {
    try {
      const medicalDocument = await MedicalDocuments.findOne({ id_medical_documents: req.params.id });
      if (!medicalDocument) {
        return res.status(404).json({ error: 'Medical document not found' });
      }
      res.status(200).json(medicalDocument);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch medical document' });
    }
  };


// Update a medical document by ID
const updateMedicalDocument = async (req, res) => {
    try {
      const updatedMedicalDocument = await MedicalDocuments.findOneAndUpdate(
        { id_medical_documents: req.params.id },
        req.body,
        { new: true }
      );
      if (!updatedMedicalDocument) {
        return res.status(404).json({ error: 'Medical document not found' });
      }
      res.status(200).json(updatedMedicalDocument);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update medical document' });
    }
  };




// Delete a medical document by ID
const deleteMedicalDocument = async (req, res) => {
    try {
      const deletedMedicalDocument = await MedicalDocuments.findOneAndDelete({ id_medical_documents: req.params.id });
      if (!deletedMedicalDocument) {
        return res.status(404).json({ error: 'Medical document not found' });
      }
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete medical document' });
    }
  };


  export {
    createMedicalDocument,
    getAllMedicalDocuments,
    getMedicalDocumentById,
    updateMedicalDocument,
    deleteMedicalDocument,
  };