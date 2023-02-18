import Video from '../models/videosModel.js';
import fs from "fs";
import pkg from '@deepgram/sdk';
const { Deepgram } = pkg;
import dotenv from 'dotenv';
dotenv.config();

async function transcribeAudio(audioFilePath, videoId) {
	// Your Deepgram API Key from the environment variable
	const deepgramApiKey = process.env.API_KEY;

	// MIME type for the file you want to transcribe (only necessary if transcribing a local file)
	const audioFileMimetype = "audio/mp3";

	// Initialize the Deepgram SDK with your API key
	const deepgram = new Deepgram(deepgramApiKey);

	// Check whether the audio file is local or remote, and prepare accordingly
	let audioSource;

	// Audio file is local
	const audioFileBuffer = fs.readFileSync(audioFilePath);
	audioSource = {
		buffer: audioFileBuffer,
		mimetype: audioFileMimetype,
	};

	// Set options for transcription
	const transcriptionOptions = {
		punctuate: true,  // Include punctuation in the transcription
		language: "es",  // Transcribe audio in Spanish
		diarize: true,   // Distinguish between different speakers in the audio
	};

	// Send the audio to Deepgram for transcription and handle the response
	try {
		const transcriptionResponse = await deepgram.transcription
			.preRecorded(audioSource, transcriptionOptions);
		//console.log("Transcription response:");
		//console.dir(transcriptionResponse, { depth: null });
		//console.log(transcriptionResponse.results.channels[0].alternatives[0].transcript);

		const transcribedText = transcriptionResponse.results.channels[0].alternatives[0].transcript;

		// Update the Video object with the transcribed text
		const updatedVideo = await Video.findOneAndUpdate({ videoId: videoId }, { transcribedText: transcribedText }, { new: true });

		console.log('Video data updated in MongoDB.');

		// Delete the audio file
		fs.unlink(audioFilePath, (err) => {
			if (err) {
				console.error(err);
				return;
			}

			console.log(`${audioFilePath} was deleted.`);
		});
	} catch (error) {
		console.error("Error during transcription:", error);
		return error;
	}

}

export default transcribeAudio;