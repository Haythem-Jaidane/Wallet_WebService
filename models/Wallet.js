import mongoose from 'mongoose';

const { Schema,model } = mongoose;

const Wallet = new Schema({
    id           : {type:Number,require:true,unique: true},
    balance      : {type:Number,require:true},
    linked_bank  : {type:String,require:true},
    id_user      : {type:Number,require:true},
    cashflow_type: {type:String,require:true},
})

export default model("Wallet",Wallet)