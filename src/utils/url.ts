//url状态管理 返回url中指定键的参数值

import { useMemo } from "react";
import { useSearchParams, URLSearchParamsInit } from "react-router-dom"
import { cleanObject } from ".";


//从url中读取特定查询参数
export const useUrlQueryParam = <K extends string>(keys: K[]) => {

    const [searchParam] = useSearchParams(); //注意这里的searchParam放在useMemo依赖项当中是没有问题的,不会造成多次渲染导致状态一直不变从而造成无限循环

    const setSearchParam = useSetUrlSearchParam()
    
    return [
         useMemo(
            //取出要查找的key放入新对象
            () => (
             keys.reduce((prev, key) => {
                return {
                  ...prev,
                  [key]: searchParam.get(key) || ''
                }
             }, {} as {[key in K]: string})), 
             //eslint-disable-next-line react-hooks/exhaustive-deps
             [searchParam]
        )
        , 
        (params: {[key in string]: unknown}) => {
            return setSearchParam(params)
        }
    ] as const //元祖
    
}


//单独抽离出hook，方便其设立url search param
export const useSetUrlSearchParam = () => {

    const [searchParam, setSearchParam] = useSearchParams(); //注意这里的searchParam放在useMemo依赖项当中是没有问题的,不会造成多次渲染导致状态一直不变从而造成无限循环

    return (params: {[key in string]: unknown}) => {
        const  o = cleanObject({...Object.fromEntries(searchParam), ...params}) as URLSearchParamsInit
        return setSearchParam(o)
    }
}