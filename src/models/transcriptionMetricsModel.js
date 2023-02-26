import Mongoose from "mongoose"

const TranscriptionMetricsSchema = new Mongoose.Schema({
    wordCount: {
        type: String,
        required: true
    },
});

const TranscriptionMetrics = Mongoose.model("TranscriptionMetrics", TranscriptionMetricsSchema);

export default TranscriptionMetrics;