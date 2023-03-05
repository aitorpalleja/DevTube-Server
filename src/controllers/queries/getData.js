import CreatorsData from '../../models/creatorsModel.js';
import VideosData from '../../models/videosModel.js';

async function getData(category = '') {
  try {
    const filter = category ? { category } : {};
    const videos = await VideosData.find(filter).populate('creator');
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
          creator: {
            name: creator.name,
            avatar: creator.avatar,
          },
        };
      })
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default getData;
