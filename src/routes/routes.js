import Express from "express";
import { get } from "mongoose";
const router = Express.Router();

import downloadVideo from '../controllers/downloadVideo.js';
import getCreatorsData from "../controllers/getCreatorsData.js";
import getAllData from "../controllers/getAllData.js";


router.get('/', (req, res) => {
  res.send('We are working fine');
});

router.get('/download', async (req, res) => {
  try {
    const { url } = req.query;
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


export default router;