import { QueryClient, useQueryClient } from 'react-query';
//乐观更新hook

import { QueryKey } from "react-query";

//生成乐观更新和数据修改后重刷的限制
export const useConfig = (queryKey: QueryKey, callback: (target: any, old?: any[]) => any[]) => {
   const queryClient = useQueryClient();
   return {
    //在成功之后刷新该queryKey所对应的缓存数据
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target: any) {
        //mutation一发生，onMutate立马被调用
        //乐观更新
        //在异步操作完成之前更新本地ui, 先获取本地数据
        const previousItem = queryClient.getQueryData(queryKey);
        queryClient.setQueryData(queryKey, (old?: any[]) => {
            // return old?.map(p => p.id === target.id ? {
            //     ...p,
            //     ...target //用目标target覆盖原有project
            // } : p) || []
            return callback(target, old)
        });
        
        //返回的内容代表在onError参数当中的context
        return {
            previousItem
        }
    },
    onError(error: any, newItem: any, context: any){
        //回滚机制 当异步操作没成功//自动回滚我们的乐观更新
        queryClient.setQueryData(queryKey, context?.previousItem)
        //if(error) console.log(error)  
    }
  }
}


//删
export const useDeleteConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old) => {
    return old?.filter( item => item.id !== target.id ) || []
}) 

export const useAddConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old) => {
   return old ? [...old, target] : []
}) 

export const useEditConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old) => {
    // console.log({queryKey, target})
    return old?.map(item => item.id === target.id ? {...item, ...target} : item) || []
},) 

