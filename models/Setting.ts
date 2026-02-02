
import mongoose, { Schema, model, models } from 'mongoose';

const SettingSchema = new Schema({
  backgroundVideoUrl: {
    type: String,
    default: '/videos/bg-optimized.mp4',
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default models.Setting || model('Setting', SettingSchema);
