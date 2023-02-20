import Video from '../models/videosModel.js';
import Creator from '../models/creatorsModel.js';
import transcribeAudio from './transcribeAudio.js'
import { createWriteStream } from 'fs';
import ytdl from 'ytdl-core';


async function downloadVideo(url) {
  try {
    const videoInfo = await ytdl.getInfo(url)
    const videoId = videoInfo.videoDetails.videoId;
    const fileName = `${videoId}.mp3`;

    const audioStream = ytdl(url, { filter: 'audioonly' });
    const outputStream = createWriteStream(fileName);

    await new Promise((resolve, reject) => {
      audioStream.pipe(outputStream);
      outputStream.on('finish', resolve);
      outputStream.on('error', reject);
    });

    let creator = await Creator.findOne({ name: videoInfo.videoDetails.author.name });
    if (!creator) {
      creator = new Creator({
        name: videoInfo.videoDetails.author.name,
        avatar: videoInfo.videoDetails.author.thumbnails[0].url,
        subscribersCount: videoInfo.videoDetails.author.subscriber_count,
      });
      await creator.save();
    }

    const thumbnail = videoInfo.videoDetails.thumbnails.reduce((prev, current) => {
      return (prev.width > current.width) ? prev : current;
    });

    const videoData = new Video({
      creator: creator._id,
      videoTitle: videoInfo.videoDetails.title,
      videoThumbnail: thumbnail.url,
      videoId: videoId,
      viewCount: videoInfo.videoDetails.viewCount,
      videoDescription: videoInfo.videoDetails.description,
      publishData: videoInfo.videoDetails.publishDate,
    });

    await videoData.save()
    console.log('Video data stored in MongoDB.');


    /*console.log('Audio downloaded successfully.');
    console.log('Channel Avatar:', videoInfo.videoDetails.author.thumbnails[0].url);
    console.log('Title:', videoInfo.videoDetails.title);
    console.log('Thumbnail:', videoInfo.videoDetails.thumbnails[0].url);
    console.log('Channel:', videoInfo.videoDetails.author.name);
    console.log('Publish Date:', videoInfo.videoDetails.publishDate)*/

    transcribeAudio(fileName, videoId)

  } catch (error) {
    console.error('Error downloading audio:', error);
  }
}

export default downloadVideo;