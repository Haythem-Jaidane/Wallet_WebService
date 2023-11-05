import mongoose from 'mongoose';

const { Schema,model } = mongoose;

const Prescription = new Schema({
    id           : {type:Number,require:true,unique: true},
    id_doctor    : {type:Number,require:true},
    id_patient   : {type:Number,require:true},
    id_delivery_man :{type:Number},
    instruction  : {type:String,require:true},
    id_medicament: {type:Number},
    delivery     : {type:Boolean},
    state        : {type:Boolean,require:true}
}
)

export default model("Prescription",Prescription)