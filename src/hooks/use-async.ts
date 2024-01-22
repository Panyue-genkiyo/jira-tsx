import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "./customHook";


//如何更好的处理异步请求 useAsync

interface State<D>{
    error: Error | null;
    data: D | null;
    stat: 'idle' | 'loading' | 'error' | 'success';  
}

const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null
}

interface ErrorConfig{
    ifThrowError: boolean
}

const defaultErrorConfig: ErrorConfig = {
    ifThrowError: false
}

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
    const mountRef = useMountedRef(); //判断组件是否已加载完成
    //组件还在挂载时更新状态， 阻止状态在已卸载组件上更新的情况
    return useCallback((...args: T[]) => (mountRef?.current ? dispatch(...args) : void 0), [dispatch, mountRef])
}

//更加方便的管理异步请求 error loading
export const useAsync = <D>(initialState?: State<D>, errorConfig?: ErrorConfig) => {

   const newErrorConfig = {
      ...defaultErrorConfig,
      ...errorConfig
   }

   const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>>)=> ({
     ...state,
     ...action
   }),{
       ...defaultInitialState,
       ...initialState
   });

   const safeDispatch = useSafeDispatch(dispatch);

   const setData = useCallback((data: D) => safeDispatch({
    data,
    stat: 'success',
    error: null
   }), [safeDispatch]);

   

   const setError = useCallback((error: Error) => safeDispatch({
    data: null,
    stat: 'error',
    error
   }), [safeDispatch]);

   //惰性初始化state
   const [retry, setReTry] = useState(() => () => {});
   
   
   //触发异步请求的数据
   //注意在这里不加useCallback每次渲染都会创建一个run函数，这就是无限循环的问题
   const run = useCallback((promise: Promise<D>, retryConfig?: {
     retry: () => Promise<D>
   }) => {
    if(!promise || !promise.then){
        throw new Error('请传入promise类型数据')
    }
    
    safeDispatch({ stat: 'loading'}); //在promise开始前置为loading

    setReTry(() => () => {
        //拿到上一次的promise
        if(retryConfig?.retry){
            run(retryConfig.retry(), retryConfig)
        }
    })
    return promise.then(data => {
        setData(data);  
        return data
    }).catch(error => {
        //会在这儿接收到错误
        setError(error);
        if(newErrorConfig.ifThrowError) return Promise.reject(error);
        //下面这个error返回是同步，而上面的setError是异步的
        return error
    })
   }, [safeDispatch, setData, setError,newErrorConfig.ifThrowError])

   return {
     isIdle : state.stat === 'idle',
     isLoading: state.stat === 'loading',
     isError: state.stat === 'error',
     isSuccess: state.stat === 'success',
     run,
     setData,
     setError,
     //retry被调用时重新跑一遍run函数,让state再次被刷新
    //  retry: () =>{
     retry,
    //  },
     ...state
   }
   
}