import { useHttp } from "@/hooks/customHook";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useCallback, useEffect } from "react";
import { useAsync } from "@/hooks/use-async";
import { Project } from "@/screens/project-list/list";
import { cleanObject } from ".";


//获取project
export const useProjects = (params?: Partial<Project>) => {
    const client = useHttp();
    // const {run, ...res} = useAsync<Project[]>()

    // const fetchProject = useCallback(() =>  client('projects', {
    //     data: cleanObject(params || {})
    // }), [params, client])

    // //获取数据
    // useEffect(() => {
    //     run(fetchProject(), {
    //         retry: fetchProject
    //     })
    // }, [params, run, fetchProject])


    //使用useQuery来获取projcet数据
    //指定返回data类型为Project[]
    return useQuery<Project[]>(['projects', params],() => client('projects', {
        data: cleanObject(params || {})
    }))
}


//编辑project
export const useEditProject = () => {
    const client = useHttp();
    const queryClient = useQueryClient();
    // const { run, ...asyncRes } = useAsync();
    // const mutate = (params: Partial<Project>) => {
    //    return run(client(`projects/${params.id}`, {
    //         data: params,
    //         method: 'PATCH'
    //     }))
    // }
    // return {
    //     mutate,
    //     ...asyncRes
    // }

    return useMutation((params: Partial<Project>) => {
        return client(`projects/${params.id}`, {
            method: 'PATCH',
            data: params
        })
    }, {
        onSuccess: () => queryClient.invalidateQueries('projects')
    })
}


//添加project
export const useAddProject = () => {
    const client = useHttp();
    const queryClient = useQueryClient();
    
   return useMutation((params: Partial<Project>) => {
       return client(`project/${params.id}`, {
         data: params,
         method: 'POST'
       });
   }, {
    onSuccess: () => queryClient.invalidateQueries('projects')
   })

}
