import { describe, it, expect, vi } from 'vitest';
import { sendChatMessage } from './chatApi';
import { axiosInstance } from './axios';
import type { ChatRequest, ChatResponse } from '../interfaces/chat';

vi.mock('./axios', () => ({
  axiosInstance: {
    post: vi.fn()
  }
}));

describe('sendChatMessage', () => {
  it('should send message and return response', async () => {
    const mockData: ChatRequest = { message: 'Hello' };
    const mockResponse: ChatResponse = { response: 'Hi there!' };

    // @ts-ignore
    axiosInstance.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await sendChatMessage(mockData);

    expect(axiosInstance.post).toHaveBeenCalledWith('/chat', mockData);
    expect(result).toEqual(mockResponse);
  });
});
