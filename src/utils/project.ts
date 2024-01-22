import { useProjectsSearchParams } from './../screens/project-list/util';
import { useHttp } from "@/hooks/customHook";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { useCallback, useEffect } from "react";
import { useAsync } from "@/hooks/use-async";
import { Project } from "@/screens/project-list/list";
import { cleanObject } from ".";
import { useEditConfig, useAddConfig, useDeleteConfig } from './use-optimistic';


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
export const useEditProject = (queryKey: QueryKey, isInvalidateQueries?: boolean) => {
    const client = useHttp();
    //const queryClient = useQueryClient();
    // const [searchParam] = useProjectsSearchParams();
    //const queryKey =  ['projects', useProjectsSearchParams()];
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

    // console.log(queryKey)

    return useMutation((params: Partial<Project>) => {
        // console.log(params)
        return client(`projects/${params.id}`, {
            method: 'PATCH',
            data: params
        })
    }, useEditConfig(queryKey))
}


//添加project
export const useAddProject = (queryKey: QueryKey) => {
    const client = useHttp();
    
   return useMutation((params: Partial<Project>) => {
       return client(`projects`, {
         data: params,
         method: 'POST'
       });
   }, useAddConfig(queryKey))

}


//删除某个project
export const useDeleteProject = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation(({id}: {id: number}) => {
        return client(`projects/${id}`, {
            method: 'DELETE'
        })
    }, 
    useDeleteConfig(queryKey)
    )
}

//获取某个详情project 根据projectId
export const useProject = (id?: number) => {
    const client = useHttp();
    // const queryClient = useQueryClient();
    
    return useQuery<Project>(['project', {id}], () => {
        return client(`projects/${id}`)
    }, {
        //在这种情况戏 只有当id不为undefine时才去触发详情， 否则不会再区执行该query
        enabled: !!id
    })
}


