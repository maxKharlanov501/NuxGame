import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { getTodos } from "@/utils/getTodos";
import { ITodo, ITodoParams } from "./todos.interfaces";

export const useTodosStore = defineStore('todos', () => {
  const todos = ref<ITodo[]>([])
  const favoritesTodoIds = ref<number[]>(localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites') ?? '') : [])

  const params = reactive<ITodoParams>({
    query: '',
    status: 'All',
    selectedId: null
  })

  const matchesQuery = (todo: ITodo) => todo.title.toLowerCase().includes(params.query.toLowerCase())

  const matchesStatus = (todo: ITodo) => {
    switch (params.status) {
      case 'Completed':
        return todo.completed
      case 'Uncompleted':
        return !todo.completed
      case 'Favorites':
        return favoritesTodoIds.value.includes(todo.id)
      default:
        return true
    }
  }

  const matchesUserId = (todo: ITodo) => params.selectedId ? params.selectedId === todo.userId : true


  const filteredTodos = computed(() => {
    return todos.value.filter((todo: ITodo) => matchesStatus(todo) && matchesQuery(todo) && matchesUserId(todo))
  })

  const findTodos = async () => {
    try {
      if (todos.value && todos.value.length > 0) return
      const response = await getTodos()
      if (response) todos.value = response
      else console.error('Todos not found')
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  const handleFavorites = (todoId: number) => {
    if (favoritesTodoIds.value.includes(todoId)) favoritesTodoIds.value = favoritesTodoIds.value.filter((id: number) => id !== todoId)
    else favoritesTodoIds.value.push(todoId)
    localStorage.setItem('favorites', JSON.stringify(favoritesTodoIds.value))
  }

  const createTodo = (newTodo: { title: string; userId: string }): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lastTodoId = todos.value.length > 0 ? todos.value[todos.value.length - 1].id : 0
        const payload: ITodo = {
          id: lastTodoId + 1,
          userId: Number(newTodo.userId),
          title: newTodo.title,
          completed: false,
        };
        todos.value.push(payload)
        resolve()
      }, 1000)
    })
  }
  
  const clearFilters = () => {
    params.query = ''
    params.selectedId = null
    params.status = 'All'
  }

  return { todos, favoritesTodoIds, findTodos, params, filteredTodos, handleFavorites, createTodo, clearFilters }
})