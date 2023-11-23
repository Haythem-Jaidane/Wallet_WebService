import mongoose from 'mongoose';

const { Schema,model } = mongoose;

const Wallet = new Schema({
    id_user      : {type:Number,require:true},
    balance      : {type:Number,require:true},
    num_paymee   : {type:Number},
})

export default model("Wallet",Wallet)