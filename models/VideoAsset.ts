
import mongoose, { Schema, model, models } from 'mongoose';

const VideoAssetSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  fileSize: {
    type: Number, // in bytes
  },
  mimeType: {
    type: String,
    default: 'video/mp4',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default models.VideoAsset || model('VideoAsset', VideoAssetSchema);
