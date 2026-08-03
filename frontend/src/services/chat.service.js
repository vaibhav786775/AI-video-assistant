import api from './api'

export const chatService = {
  sendMessage: (data) => api.post('/chat', data),
}
