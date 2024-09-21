import { useApi } from '@/composables/useApi';
import type { ITodo } from '@/store/todo/todos.interfaces';

export const getTodos = async (): Promise<ITodo[]> => {
  try {
    const { get } = useApi()
    return await get<ITodo[]>('/todos')
  } catch (error) {
    throw error
  }
}