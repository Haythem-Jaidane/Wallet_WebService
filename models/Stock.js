import mongoose from 'mongoose';

const { Schema,model } = mongoose;

const Stock = new Schema({
    id           : {type:Number,require:true,unique: true},
    id_medical_equipement    : { type: Schema.Types.ObjectId, ref: 'Medical_equipment', required: true },//id Mongoose
    quantity    : {type:Number,require:true}
}
)

export default model("Stock",Stock)