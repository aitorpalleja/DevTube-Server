import Video from '../models/videosModel.js';
import TranscriptionMetrics from '../models/transcriptionMetricsModel.js';

async function countWords(transcribedText, videoId, videoDuration) {
  try {
    const words = transcribedText.trim().toLowerCase().split(/[\s,.;:!?¡¿()«»]+/);
    const wordCount = words.length;
    const wordsPerMinute = wordCount / (videoDuration / 60);

    const video = await Video.findOne({ videoId });

    if (!video) {
      throw new Error('Video not found');
    }

    // Count the frequency of each word
    const wordFreq = {};
    words.forEach((word) => {
      wordFreq[word] = wordFreq[word] ? wordFreq[word] + 1 : 1;
    });

    // Sort the words by frequency and select the top 20
    const sortedWords = Object.entries(wordFreq).sort((a, b) => b[1] - a[1]).slice(0, 20);

    console.log('Sorted words:', sortedWords);

    // Map the sorted words to the required format
    const topWords = sortedWords.map(([word, count]) => ({ word, count }));

    const transcriptionData = new TranscriptionMetrics({
      wordCount,
      wordsPerMinute,
      video: video._id,
      topWords
    });

    await transcriptionData.save();
    console.log('Transcription metrics stored in MongoDB.');
  } catch (error) {
    console.error("Error during count:", error);
    return error;
  }
}

export default countWords;
