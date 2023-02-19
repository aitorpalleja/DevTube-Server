import mongoose from 'mongoose';

const CreatorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  subscribersCount: {
    type: Number,
    required: true,
  }
});

const Creator = mongoose.model('Creator', CreatorSchema);

export default Creator;
