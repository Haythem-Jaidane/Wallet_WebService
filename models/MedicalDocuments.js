import mongoose from 'mongoose';

const { Schema,model } = mongoose;

const Medical_documents= new Schema({
    id_medical_documents          : {type:Number,require:true,unique:true},
    id_biologist    : { type: Schema.Types.ObjectId, ref: 'User', required: true },
    id_patient   : { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title        : {type:String,require:true},
    description  : {type:String,require:true},
    urgent      : {type:Boolean,require:true},
    date_création    : { type:Date, required: true },
    contenu      :{type:String},
    category : {
      type: String,
      enum: ['bilan', 'scanner', 'irm'],
    },
  });
  
export default  model('Medical_documents', Medical_documents);