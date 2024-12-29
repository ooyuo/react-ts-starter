import {
  useCreatePost,
  usePosts,
} from '@/api/posts';
import { useAuthStore } from '@/stores/useAuthStore';

export function Posts() {
  const { data: posts, isLoading, error } = usePosts()
  const createPost = useCreatePost()
  const user = useAuthStore((state) => state.user)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      {user && (
        <button
          onClick={() => {
            createPost.mutate({
              title: 'New Post',
              content: 'Content...',
            })
          }}
        >
          Create Post
        </button>
      )}

      {posts?.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  )
}
