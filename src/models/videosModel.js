import Mongoose from "mongoose"

const VideoSchema = new Mongoose.Schema({
    channelName: {
        type: String,
        required: false
    },
    channelAvatar: {
        type: String,
        required: false
    },
    videoTitle: {
        type: String,
        required: false
    },
    videoThumbnail: {
        type: String,
        required: false
    },
    publishData: {
        type: Date,
        required: false
    },
    transcribedText: {
        type: String,
        required: false
    },
    videoId: {
        type: String,
        required: false,
    },
    viewCount: {
        type: Number,
        required: false

    }

});

const Video = Mongoose.model("Video", VideoSchema);

export default Video;