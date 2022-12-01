import mongoose from 'mongoose';

const pdfSchema = new mongoose.Schema({

    name :{
        type: String,
        required : [true,"Please add your name"],

    },
    department :{
        type: String,
        required : [true,"Please add your department"],

    },
    regNo :{
        type: Number,
        unique: true,
        required : [true,"Please add your Registration No"],

    },
    id :{
        type: Number,
        default : 0

    },
    image : {
        type: String,
        required : true

    },
    phone :{
        type: String,
        required : [true,"Please add your phone"],

    },
},
{timestamps : true})

const PdfForm = mongoose.model("PdfForm", pdfSchema);
export default PdfForm;