// const mongoose=require('mongoose')

// const recipelistSchema=new mongoose.Schema({
    
//     title: { type: String },
//     description: { type: String },
//     ingredients: { type: [String] }, // Array of strings for ingredients
//     instructions: { type: [String] } // Array of strings for instructions




// },{timestamps:true})
// module.exports=mongoose.model('recipelists',recipelistSchema)
const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
    sender: { type: [String], required: true }, // Who sent the message (array of strings)
    message: { type: [String], required: true }, // The message content (array of strings)
    timestamp: { type: Date, default: Date.now } // When the message was sent
    // Add any other fields you need for your chat message data
}, { timestamps: true });

module.exports = mongoose.model('message', ChatMessageSchema);
