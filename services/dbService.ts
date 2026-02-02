import { ProjectInquiry } from '../types';

export const dbService = {
  async saveInquiry(data: Omit<ProjectInquiry, 'id' | 'createdAt' | 'status'> & { industry?: string, generatedStrategy?: string }): Promise<ProjectInquiry> {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit inquiry');
    }

    return response.json();
  },

  async saveVisual(data: { prompt: string, aspectRatio: string, imageData: string }) {
    const response = await fetch('/api/visuals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async getRecentVisuals() {
    const response = await fetch('/api/visuals');
    if (!response.ok) return [];
    return response.json();
  }
};