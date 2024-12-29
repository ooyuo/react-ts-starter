import { ApiResponse } from '@/shared/api/types';

// 도메인 모델
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  createdAt: string;
  status: 'draft' | 'published';
}

// API 타입
export interface GetPostsParams {
  page: number;
  limit: number;
  searchType?: string;
  search?: string;
  status?: 'all' | 'draft' | 'published';
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, string>;
}

export interface GetPostsResponse extends ApiResponse<Post[]> {
  total: number;
  page: number;
  limit: number;
}

export type GetPostResponse = ApiResponse<Post>;
export type CreatePostDTO = Pick<Post, 'title' | 'body' | 'userId'>;
export type UpdatePostDTO = Partial<CreatePostDTO> & { id: number };
