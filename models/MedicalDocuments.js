import mongoose from 'mongoose';

const { Schema,model } = mongoose;

const Medical_documents= new Schema({
    id_medical_documents          : {type:Number,require:true,unique: true},
    title        : {type:String,require:true},
    description  : {type:String,require:true},
    urgent      : {type:Boolean,require:true},
    date_création    : { type:Date, required: true },
    contenu      :{type:Image},
     category : {
      type: String,
      enum: ['bilan', 'scanner', 'irm'],
    },
  });
  
  export default  model('Medical_documents', Medical_documents);