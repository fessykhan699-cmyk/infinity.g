import mongoose, { Schema, model, models } from 'mongoose';

const VisualSchema = new Schema({
  prompt: {
    type: String,
    required: true,
  },
  aspectRatio: {
    type: String,
    enum: ['1:1', '16:9', '9:16', '4:3', '3:4'],
    default: '16:9',
  },
  imageData: {
    type: String, // Store as base64 data URI
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default models.Visual || model('Visual', VisualSchema);