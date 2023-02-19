import Mongoose from "mongoose"

const VideoSchema = new Mongoose.Schema({
    creator: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Creator',
        required: true,
      },
    videoTitle: {
        type: String,
        required: true
    },
    videoThumbnail: {
        type: String,
        required: true
    },
    videoId: {
        type: String,
        required: true,
    },
    viewCount: {
        type: Number,
        required: true

    },
    publishData: {
        type: Date,
        required: true
    },
    videoDescription: {
        type: String,
        required: true
    },
    transcribedText: {
        type: String,
        required: false
    }

});

const Video = Mongoose.model("Video", VideoSchema);

export default Video;