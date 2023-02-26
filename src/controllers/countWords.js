import Video from '../models/videosModel.js';

async function countWords(transcribedText, videoId) {
    try {
        const wordCount = transcribedText.split(' ').length;
        
        // Update the Video object with the transcribed text and word count
        const updatedVideo = await Video.findOneAndUpdate({ videoId: videoId }, { wordCount: wordCount }, { new: true });

        console.log('Video data updated in MongoDB.');
    } catch (error) {
        console.error("Error during count:", error);
        return error;
    }
}

export default countWords;