import { ApiError } from '@/shared/api/api-client';
import { createMutation } from '@/shared/lib/query/create-mutation';
import { useQuery } from '@tanstack/react-query';

import { postApi } from '../api/post.api';
import { POST_KEYS } from './constants';
import { CreatePostDTO, GetPostResponse, UpdatePostDTO } from './types';

// Queries
// export const usePostsQuery = () => {

//   return useQuery({
//     queryKey: ['posts', 'list', search],
//     queryFn: () => postApi.getAll({
//       page: search.page,
//       limit: search.limit,
//       searchType: search.searchType,
//       search: search.searchValue,
//       filters: search.filters,
//     }),
//   });
// };

export const usePostQuery = (id: number) => {
  return useQuery({
    queryKey: POST_KEYS.detail(id),
    queryFn: () => postApi.getById(id),
    enabled: Boolean(id),
    retry: (failureCount, error: ApiError) => {
      return failureCount < 3 && error.response?.status !== 404;
    },
  });
};

// Mutations
export const useCreatePost = () => {
  return createMutation<GetPostResponse, CreatePostDTO>({
    mutationFn: postApi.create,
    invalidateQueries: [POST_KEYS.lists()],
  });
};

export const useUpdatePost = (id: number) => {
  return createMutation<GetPostResponse, UpdatePostDTO>({
    mutationFn: postApi.update,
    invalidateQueries: [POST_KEYS.lists(), POST_KEYS.detail(id)],
  });
};

export const useDeletePost = (id: number) => {
  return createMutation<void, number>({
    mutationFn: postApi.delete,
    invalidateQueries: [POST_KEYS.lists(), POST_KEYS.detail(id)],
  });
};
