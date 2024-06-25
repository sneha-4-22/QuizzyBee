const mongoose = require('mongoose');
const {Schema} = mongoose;

const QuizSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    question: {
        type: String,
        required: true
    },
    option1: {
        type: String,
        required: true,
        
    },option2: {
        type: String,
        required: true,
        
    },option3: {
        type: String,
        required: true,
        
    },option4: {
        type: String,
        required: true,
        
    },
    answer: {
        type: String,
        required: true,
        
    },
    title: {
        type: String,
        required: true,
    },
    mcq: {
        type: String,
        required: true,
    },
    code:{
        type: String,
        required: true,
        default: "test"
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('quizs', QuizSchema); //quiz is model name