import { useApi } from '@/composables/useApi';
import { IUser } from '@/store/user/users.interfaces';

export const getUsers = async (): Promise<IUser[]> => {
  try {
    const { get } = useApi()
    return await get<IUser[]>('/users')
  } catch (error) {
    throw error
  }
}