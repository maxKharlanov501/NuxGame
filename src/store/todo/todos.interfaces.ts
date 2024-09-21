export interface ITodo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export interface ITodoParams {
  query: string
  status: 'Completed' | 'Uncompleted' | 'All' | 'Favorites'
  selectedId: number | null
}