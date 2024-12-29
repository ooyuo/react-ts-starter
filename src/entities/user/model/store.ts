import {
  createAdminStore,
  SortableFilters,
  StatusFilters,
} from '@/shared/lib/store/create-admin-params';

type UserSortBy = 'name' | 'email';
type UserRole = 'admin' | 'user';

interface UserFilters extends SortableFilters<UserSortBy>, StatusFilters<UserRole> {}

export const useUserStore = createAdminStore<UserFilters>('users', {
  sortBy: 'name',
  status: 'user'
});
