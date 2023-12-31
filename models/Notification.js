import mongoose from 'mongoose';

const { Schema,model } = mongoose;

const Notification = new Schema({
    id           : {type:Number,require:true,unique: true},
    id_medical_documents    : { type: Schema.Types.ObjectId, ref: 'MedicalDocuments', required: true },
    contenu_notif   : {type:String,require:true},
    date_envoi : {type:Date,require:true}
}
)

export default model("Notification",Notification)