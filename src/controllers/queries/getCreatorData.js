import Creator from '../../models/creatorsModel.js';
import Video from '../../models/videosModel.js';

async function getCreatorData(req, res) {
  try {
    const creatorName = req.params.creatorName;
    const creator = await Creator.findOne({ name: creatorName });

    if (!creator) {
      return res.status(404).json({ error: `Creator ${creatorName} not found` });
    }

    const videos = await Video.find({ creator: creator._id });

    const creatorData = {
      name: creator.name,
      avatar: creator.avatar,
      subscribersCount: creator.subscribersCount,
      videos: videos.map((video) => ({
        videoTitle: video.videoTitle,
        videoThumbnail: video.videoThumbnail,
        videoId: video.videoId,
        viewCount: video.viewCount,
        videoDuration: video.videoDuration,
        publishData: video.publishData,
        videoDescription: video.videoDescription,
      })),
    };

    return res.status(200).json(creatorData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
}

export default getCreatorData;
