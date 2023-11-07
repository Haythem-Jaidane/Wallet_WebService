import mongoose from 'mongoose';

const { Schema,model } = mongoose;

const Stock = new Schema({
    id           : {type:Number,require:true,unique: true},
    id_medical_equipement    : {type:Number,require:true},
    quantity    : {type:Number,require:true}
}
)

export default model("Stock",Stock)