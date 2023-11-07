import mongoose from 'mongoose';

const { Schema,model } = mongoose;

const Subscription = new Schema({
    id           : {type:Number,require:true,unique: true},
    id_wallet    : {type:Number,require:true},
    type         : {type:String,enum:["Subscription Medicament","Micro-Credit"],require:true},
    id_medicament: {type:Number},
    each_in_days : {type:Number},
    amount       : {type:Number},
    fees         : {type:Number}
}
)

export default model("Subscription",Subscription)