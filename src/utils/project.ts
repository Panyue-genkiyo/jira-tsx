import { useHttp } from "@/hooks/customHook";
import { useCallback, useEffect } from "react";
import { useAsync } from "@/hooks/use-async";
import { Project } from "@/screens/project-list/list";
import { cleanObject } from ".";


//获取project
export const useProjects = (params?: Partial<Project>) => {
    const client = useHttp();
    const {run, ...res} = useAsync<Project[]>()

    const fetchProject = useCallback(() =>  client('projects', {
        data: cleanObject(params || {})
    }), [params, client])

    //获取数据
    useEffect(() => {
        run(fetchProject(), {
            retry: fetchProject
        })
    }, [params, run, fetchProject])

  return res
}


//编辑project
export const useEditProject = () => {
    const client = useHttp();
    const { run, ...asyncRes } = useAsync();
    const mutate = (params: Partial<Project>) => {
       return run(client(`projects/${params.id}`, {
            data: params,
            method: 'PATCH'
        }))
    }
    return {
        mutate,
        ...asyncRes
    }
}

