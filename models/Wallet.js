import mongoose from 'mongoose';

const { Schema,model } = mongoose;

const Wallet = new Schema({
    balance      : {type:Number,require:true},
    linked_bank  : {type:String},
    cashflow_type: {type:String,enum:["week","month","quart"]},
})

export default model("Wallet",Wallet)