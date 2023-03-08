import Express from "express";
const router = Express.Router();

import getCreatorsData from "../controllers/queries/getCreatorsData.js";
import getAllData from "../controllers/queries/getAllData.js";
import getVideoData from '../controllers/queries/getVideoData.js';
import getData from "../controllers/queries/getData.js";

import getTranscriptionDataForVideo from '../controllers/queries/getTranscriptionDataForVideo.js'

import getCreatorData from '../controllers/queries/getCreatorData.js';



router.get('/', (req, res) => {
  res.send('We are working fine');
});

router.get('/download', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send('Invalid URL');
  }

  try {
    await downloadVideo(url);
    res.send('Video downloaded successfully.');
  } catch (error) {
    res.status(500).send(`Error downloading video: ${error.message}`);
  }
});

router.get('/getCreatorsData', async (req, res) => {
  try {
    const creators = await getCreatorsData();
    res.json(creators);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/getAllData', async (req, res) => {
  try {
    const videos = await getAllData();
    res.json(videos);
  } catch (error) {
    res.status(500).send('An error occurred while fetching videos.');
  }
});

router.get('/getData', async (req, res, next) => {
  try {
    const data = await getData();
    res.json(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/getData/:category', async (req, res, next) => {
  try {
    const { category } = req.params;
    const data = await getData(category);
    res.json(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});


router.get('/getVideoData/:videoId', getVideoData);

router.get('/getTranscriptionDataForVideo/:videoId', getTranscriptionDataForVideo);

router.get('/getCreatorData/:creatorName', getCreatorData);




export default router;