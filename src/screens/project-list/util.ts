import { useProject } from "@/utils/project"
import { useSetUrlSearchParam, useUrlQueryParam } from "@/utils/url"
import {  useMemo } from "react"

export const useProjectsSearchParams = ()  => {
    
    const [param, setParams] = useUrlQueryParam(['name', 'personId'])

    // console.log({param})

    return [
       useMemo(() => (
        {...param, personId: +param.personId || undefined}
       ), [param]), 
       setParams
    ] as const
   
}


//利用路由参数管理模态框的关闭和打开
export const useProjectModal = () => {

    //理由url查询参数来保存状态，起到了全局状态管理器的功能
    //判断是否处在创建项目状态
    const [{ projectCreate } ] = useUrlQueryParam(['projectCreate'])
    //用来判断是否在编辑状态
    const [{ editingProjectId } ] = useUrlQueryParam(['editingProjectId'])

    const setUrlSearchParm = useSetUrlSearchParam();

    //根据id找出要被更新的project
    const {data: editingProject, isLoading} = useProject(Number(editingProjectId))

    const startEdit = (id: number) => {
        setUrlSearchParm({ editingProjectId: id })
    }
    
    const open = () => {
        setUrlSearchParm({projectCreate: true});
    }
    
    const close = () => {
        setUrlSearchParm({
            projectCreate: '',
            editingProjectId: ''
        })
    }

    return {
        open,
        close,
        projectModalOpen: projectCreate === 'true' || !!editingProject,
        startEdit,
        editingProject,
        isLoading
    }
}


//获取projects的queryKey
export const useProjectQueryKey = () => {
    const [searchParam] = useProjectsSearchParams()
    return ['projects', searchParam]
}