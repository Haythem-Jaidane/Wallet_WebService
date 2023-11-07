import mongoose from 'mongoose';

const { Schema,model } = mongoose;

const Medical_equipment = new Schema({
    id           : {type:Number,require:true,unique: true},
    name         : {type:String,require:true,unique:true},
    description  : {type:String,require:true},
    price        : {type:Number,require:true},
    image        : {type:String,require:true},
    type    : { type: String, enum: ['Medication', 'ParaPharmaceutical'], required: true },
},

);
const Medication_equipment = new Schema({
    dosage  :{type:String,require:true}
  });

  const ParaPharmaceutical_equipment = new Schema({
     category: {
      type: String,
      enum: ['Skin care', 'Oral and dental hygiene', 'Hair care' ,'Makeup' , 'Baby care' , 'Orthopedic' ,'Eye care', 'Ear care', 'Allergy Product', 'Sport product'],
    },
  });
  

const MedicalEquipment = model('Medical_equipment', Medical_equipment);
const Medication = MedicalEquipment.discriminator('Medication_equipment', Medication_equipment);
const ParaPharmaceutical = MedicalEquipment.discriminator('ParaPharmaceutical_equipment', ParaPharmaceutical_equipment);

export { MedicalEquipment, Medication, ParaPharmaceutical };