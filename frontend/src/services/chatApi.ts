import { axiosInstance } from './axios';
import { ChatRequest, ChatResponse } from '../interfaces/chat';

export const sendChatMessage = async (data: ChatRequest): Promise<ChatResponse> => {
    const response = await axiosInstance.post<ChatResponse>("/chat", data)
    return response.data
}