import CreatorsData from '../../models/creatorsModel.js'
import VideosData from '../../models/videosModel.js'

async function getAllData() {
    try {
      const videos = await VideosData.find().populate('creator');
      return Promise.all(
        videos.map(async (video) => {
          const creator = await CreatorsData.findById(video.creator);
          return {
            videoTitle: video.videoTitle,
            videoThumbnail: video.videoThumbnail,
            videoId: video.videoId,
            viewCount: video.viewCount,
            videoDuration: video.videoDuration,
            publishData: video.publishData,
            videoDescription: video.videoDescription,
            transcribedText: video.transcribedText,
            creator: {
              name: creator.name,
              avatar: creator.avatar,
              subscribersCount: creator.subscribersCount,
            },
          };
        })
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

export default getAllData;