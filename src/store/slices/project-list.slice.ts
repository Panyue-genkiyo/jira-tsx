//切片

import { RootState } from "@/store"
import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"

interface State{
    projectModalOpen: boolean
}


const initialState: State = {
    projectModalOpen: false
}


//projectList中共用的store的 切片 包含reducer action
export const projectListSlice = createSlice({
    name: 'projectListSlice',
    initialState,
    reducers: {
       //纯函数不包含任何副作用 接受state和action两个参数
       //此时不需要playload
        openProjectModal(state){
            //结合了immer(immer在底层帮我们处理了相关返回新 state)
            state.projectModalOpen = true
        },
        closeProjectModal(state){
            state.projectModalOpen = false
        }
    }
})


//抛出action 方便其在组件中dispatch
export const projectListAction = projectListSlice.actions;

//抽象获取其中projectModalOpen的方法
export const selectProjectModalOpen = ((state: RootState) => state.projectList.projectModalOpen)