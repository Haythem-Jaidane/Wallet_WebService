import mongoose from 'mongoose';

const { Schema,model } = mongoose;

const Transaction = new Schema({
    id         : {type:Number,require:true,unique: true},
    id_sender  : {type:Number,require:true},
    id_receiver: {type:Number,require:true},
    amount     : {type:Number,require:true},
    fees       : {type:Number,require:true},
    type       : {type:String,require:true},
},
{
    timestamps : true
})

export default model("Transaction",Transaction)