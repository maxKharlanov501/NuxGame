import { IUser } from "@/store/user/users.interfaces"
import Cookies from "js-cookie"

export const getUserProfile = (): IUser | null => {
  const user = Cookies.get('user')
  if (user) return JSON.parse(user)
  else return null
}