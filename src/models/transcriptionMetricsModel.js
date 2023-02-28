import mongoose from "mongoose";

const TranscriptionMetricsSchema = new mongoose.Schema({
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
        required: true,
    },
    wordCount: {
        type: Number,
        required: true,
    },
    wordsPerMinute: {
        type: Number,
        required: true,
    },
    topWords: [{
        word: {
            type: String,
            required: false
        },
        count: {
            type: Number,
            required: false
        }
    }]

});

const TranscriptionMetrics = mongoose.model("TranscriptionMetrics", TranscriptionMetricsSchema);

export default TranscriptionMetrics;
