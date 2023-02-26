import VideosData from '../../models/videosModel.js';

async function getVideoData(req, res) {
  try {
    const { videoId } = req.params;
    const video = await VideosData.findOne({ videoId }).populate('creator');
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    const creator = video.creator;
    const videoData = {
      videoTitle: video.videoTitle,
      videoThumbnail: video.videoThumbnail,
      videoId: video.videoId,
      viewCount: video.viewCount,
      publishData: video.publishData,
      videoDescription: video.videoDescription,
      transcribedText: video.transcribedText,
      creator: {
        name: creator.name,
        avatar: creator.avatar,
        subscribersCount: creator.subscribersCount,
      },
    };
    return res.json(videoData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default getVideoData;
