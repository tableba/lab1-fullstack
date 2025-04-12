import mongoose from "mongoose"

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  artist: String,
  year: Number
  
});

export const Album = mongoose.model('Album', albumSchema);
