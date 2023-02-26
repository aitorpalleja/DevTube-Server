import Video from '../models/videosModel.js';
import TranscriptionMetrics from '../models/transcriptionMetricsModel.js';

async function countWords(transcribedText, videoId) {
    try {
        const wordCount = transcribedText.split(' ').length;
        
        const video = await Video.findOne({ videoId }); 
        const transcriptionData = new TranscriptionMetrics({
            wordCount: wordCount,
            video: video._id 
        });
      
        await transcriptionData.save();
        console.log('Transcription metrics stored in MongoDB.');
    } catch (error) {
        console.error("Error during count:", error);
        return error;
    }
}

export default countWords;
