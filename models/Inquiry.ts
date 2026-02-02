
import mongoose, { Schema, model, models } from 'mongoose';

const InquirySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
  },
  company: {
    type: String,
    trim: true,
  },
  projectDescription: {
    type: String,
    required: [true, 'Please provide a project description'],
  },
  industry: {
    type: String,
  },
  generatedStrategy: {
    type: String, // Stores the Markdown/Text output from Gemini
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'resolved', 'strategy_generated'],
    default: 'new',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default models.Inquiry || model('Inquiry', InquirySchema);
