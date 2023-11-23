import mongoose from 'mongoose';

const { Schema,model } = mongoose;

const Transaction = new Schema({
    id_sender  : {type:Number,require:true},
    id_receiver: {type:Number,require:true},
    amount     : {type:Number,require:true},
    fees       : {type:Number,require:true},
    year       : {type:Number,require:true},
    month      : {type:Number,require:true},
    day        : {type:Number,require:true},
    hour       : {type:Number,require:true},
    minute     : {type:Number,require:true}
})

export default model("Transaction",Transaction)