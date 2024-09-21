import { getUsers } from "@/utils/getUsers";
import type { IForm, IUser } from "./users.interfaces";
import { defineStore } from "pinia";
import { ref } from "vue";
import Cookies from 'js-cookie';
import { getUserProfile } from "@/utils/getUserProfile";

export const useUsersStore = defineStore('users', () => {
  const user = ref<IUser | null>(null)
  const users = ref<IUser[]>([])

  const findUsers = async () => {
    try {
      if (users.value && users.value.length > 0) return
      const response = await getUsers()
      if (response) users.value = response
      else console.error('Users not found')
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  const login = async (form: IForm) => {
    try {
      if (!users.value) {
        console.error('Users not found')
        return
      }
      const foundUser = users.value.find((user: IUser) => {
        if (user.username === form.username && user.phone === form.phoneNumber) return user
      })
      if (foundUser) {
        user.value = foundUser
        setUserCookies(foundUser)
      }
      else console.error('User not found')
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  const setUserCookies = (user: IUser) => {
    const hours = 1
    const expiresInDays = hours / 24
    const token = JSON.stringify(user) // Should be JWT token from backend response
    Cookies.set('user', token, { expires: expiresInDays })
  }


  const getProfile = () => {
    user.value = getUserProfile()
  }

  return { user, users, findUsers, login, getProfile }
})