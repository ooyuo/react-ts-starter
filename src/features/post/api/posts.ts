import { apiClient } from '@/shared/api';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

interface Post {
  id: string
  title: string
  content: string
}

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data } = await apiClient.get<Post[]>('/posts')
      return data
    },
  })
}

export const usePost = (id: string) => {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: async () => {
      const { data } = await apiClient.get<Post>(`/posts/${id}`)
      return data
    },
  })
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newPost: Omit<Post, 'id'>) => {
      const { data } = await apiClient.post<Post>('/posts', newPost)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
