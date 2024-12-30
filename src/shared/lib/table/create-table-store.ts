import { createBaseListStore } from '@/shared/lib/store/createBaseListStore';

export const createTableStore = (storeName = 'Table') => {
  return createBaseListStore(storeName);
};
