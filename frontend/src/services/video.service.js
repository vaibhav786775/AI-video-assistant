import api from './api'

export const videoService = {
  processVideo: (data) => api.post('/process-video', data),
  getHistory: () => api.get('/videos'),
  getDashboardStats: () => api.get('/videos/dashboard/stats'),
  getVideoDetails: (videoId) => api.get(`/videos/${videoId}`),
  deleteVideo: (videoId) => api.delete(`/videos/${videoId}`),
}
