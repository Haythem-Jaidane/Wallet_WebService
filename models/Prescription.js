import mongoose from 'mongoose';

const { Schema,model } = mongoose;

const Prescription = new Schema({
    id           : {type:Number,require:true,unique: true},
    id_doctor    : { type: Schema.Types.ObjectId, ref: 'User', required: true },
    id_patient   : { type: Schema.Types.ObjectId, ref: 'User', required: true },
    id_delivery_man: { type: Schema.Types.ObjectId, ref: 'User' },
    instruction  : {type:String,require:true},
    id_medicament: { type: Schema.Types.ObjectId, ref: 'Medical_equipment', required: true },
    delivery     : {type:Boolean},
    state        : {type:Boolean,require:true}
}
)

export default model("Prescription",Prescription)