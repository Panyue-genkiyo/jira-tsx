//根reducer

import { projectListSlice } from "@/store/slices/project-list.slice";
import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "./slices/auth.slice";

export const rootReducer = {
  projectList: projectListSlice.reducer,
  auth: authSlice.reducer
}

//全局根store 全局状态管理
export const store = configureStore({
    reducer: rootReducer
})


//暴露出来dispatch和全局store的的类型
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>