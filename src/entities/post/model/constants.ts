export const POST_KEYS = {
  all: ['posts'] as const,
  lists: () => [...POST_KEYS.all, 'list'] as const,
  list: (filters: string) => [...POST_KEYS.lists(), { filters }] as const,
  details: () => [...POST_KEYS.all, 'detail'] as const,
  detail: (id: number) => [...POST_KEYS.details(), id] as const,
} as const;

export const POST_CACHE_TIME = 1000 * 60 * 5; // 5분
export const POST_STALE_TIME = 1000 * 30; // 30초
