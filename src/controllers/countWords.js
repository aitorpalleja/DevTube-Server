import Video from '../models/videosModel.js';
import TranscriptionMetrics from '../models/transcriptionMetricsModel.js';

async function countWords(transcribedText, videoId, videoDuration) {
  try {
    const wordCount = transcribedText.split(' ').length;
    const wordsPerMinute = wordCount / (videoDuration / 60); // divide by duration in minutes to get words per minute

    const video = await Video.findOne({ videoId });
    const transcriptionData = new TranscriptionMetrics({
      wordCount: wordCount,
      wordsPerMinute: wordsPerMinute,
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
