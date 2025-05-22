import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    title: { type: String, required:true, },
    tagline: { type:String,required: true },
    price:{ type: Number, required: true },
    discount:{ type: Number },
    color:{ type: [String], required: true },
    size:{ type: [String] },
    quantity:{ type: Number, required: true },
    description:{ type: String, required: true },
    features:{ type: [String] },
    category:{ type: String },
    tags:{ type: [String] },
    reviews:{
        type: [{
            author: {type: mongoose.Schema.Types.ObjectId, ref: "User",},
            review: {type: String, required: true},
            createdAt: {type: Date, default: Date.now()}
        }]
    },
    
})