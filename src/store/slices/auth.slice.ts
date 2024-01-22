import { User } from "@/screens/project-list/search-panel"
import { createSlice } from "@reduxjs/toolkit"
import { AuthForm, bootStrapUser } from "@/context/auth-context"
import * as auth from '@/auth-provider'
import { AppDispatch, RootState } from ".."

//用redux来管理获取全局user信息的各样状态
interface State  {
    user: User | null
}

const initialState: State = {
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action){
            //immer
            state.user = action.payload
        }
    }
})

//将action中setUser action暴露出来
const { setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user

//使用redux-thunk管理登陆状态 2层 thunAction
export const login = (form: AuthForm) => (dispatch: AppDispatch) => {
  return auth.login(form).then(user => dispatch(setUser(user)))
}

export const register = (form: AuthForm) => (dispatch: AppDispatch) => {
  return auth.register(form).then(user => dispatch(setUser(user)))
}

export const logout = () => (dispatch: AppDispatch) =>  {
   return auth.logout().then(() => dispatch(setUser(null)))
}

//在刷新时获取user
export const bootStrap = () => (dispatch: AppDispatch) => {
  return  bootStrapUser().then(user => dispatch(setUser(user)));
}


