import Video from '../../models/videosModel.js';
import TranscriptionMetrics from '../../models/transcriptionMetricsModel.js';

async function getTranscriptionDataForVideo(req, res) {
  try {
    const { videoId } = req.params;

    // Find the video object based on the videoId
    const video = await Video.findOne({ videoId });

    // Find the transcription data for the video object
    const transcriptionMetrics = await TranscriptionMetrics.findOne({ video: video._id }).populate('video');

    res.json(transcriptionMetrics);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export default getTranscriptionDataForVideo;
