import { useUrlQueryParam } from "@/utils/url"
import { useMemo } from "react"

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

    //理由url参数来保存状态，起到了全局状态管理器的功能
    const [{ projectCreate }, selectProjectModalOpen] = useUrlQueryParam(['projectCreate', ])
    
    const open = () => selectProjectModalOpen({projectCreate: true});
    const close = () => selectProjectModalOpen({projectCreate: ''});
    
    //换回tuple
    // return  [
    //     projectCreate === 'true', //从url中读取数据，直接是字符串true
    //     open,
    //     close
    // ] as const 

    return {
        open,
        close,
        projectModalOpen: projectCreate === 'true'
    }

    

}