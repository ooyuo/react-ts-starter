import { apiClient } from '@/shared/api';

import type { CreatePostDTO, GetPostResponse, GetPostsParams, GetPostsResponse, UpdatePostDTO } from '../model/types';

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

export const postApi = {
  getAll: async (params: GetPostsParams): Promise<GetPostsResponse> => {
    const { data } = await apiClient.get(BASE_URL, { params });
    return data;
  },

  getById: async (id: number): Promise<GetPostResponse> => {
    const { data } = await apiClient.get(`${BASE_URL}/${id}`);
    return data;
  },

  create: async (dto: CreatePostDTO): Promise<GetPostResponse> => {
    const { data } = await apiClient.post(BASE_URL, dto);
    return data;
  },

  update: async ({ id, ...dto }: UpdatePostDTO): Promise<GetPostResponse> => {
    const { data } = await apiClient.patch(`${BASE_URL}/${id}`, dto);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`${BASE_URL}/${id}`);
  },
};
