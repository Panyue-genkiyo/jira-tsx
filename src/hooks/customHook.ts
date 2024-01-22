import { useAuth } from '@/context/auth-context'
import { useEffect, useState, useCallback, useRef } from 'react'
import { http } from '@/utils/http'

//customHook
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    // TODO 依赖项加上callback会出现无限循环 useMemo 和 useCallback出现
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}


//减低发送请求的速率 范型解决
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
     const time = setTimeout(() => {
          setDebounceValue(value) 
      }, delay)
    return () => clearTimeout(time)
  }, [value, delay])

  return debounceValue
}


//自动携带token到请求头
export const useHttp = () => {
  
  const { user } = useAuth();

  return useCallback(
    (...[endPoint, config]: Parameters<typeof http>
      ) => http(endPoint, {...config, token:  user?.token || ''})
      , [user?.token]
      )

}



///节流函数实现 开头和结尾
///事件以一定频率去执行
//注意理解
export const useThrottle = (fn: Function, delay: number = 2000, { leading , trailing  }: { leading: boolean,  trailing: boolean } = {leading: true, trailing
: false}) => {

   const timer = useRef<NodeJS.Timeout | null>(null);
   let lastTime = useRef(0); //标注上一次执行时间
   
   const throttleFn = (...args: any[]) => {
       const currentTime = Date.now(); //记录下现在时间
       if(!leading && !lastTime.current){
         //不希望节流函数在第一次执行 每一个阶段的开头
         lastTime.current = currentTime;
       }
       //算出剩余时间
       let remain = delay - (currentTime - lastTime.current);
       if(remain <= 0){
          // console.log({ remain, leading })
         //代表我希望第一次执行
         //判断有没有timer, 计时器
         if(timer.current){
          //清理计时器
          clearTimeout(timer.current);
          timer.current = null;
         }
         //执行
         fn.apply(this, args);
         //更新上一次的触发时间
         lastTime.current = currentTime;
         return;
       }
       if(trailing && !timer.current){
          timer.current = setTimeout(() => {
              timer.current = null;
              lastTime.current = !leading ? 0 : Date.now();
              fn.apply(this, args)
          }, remain)
       }
   }

   //缓存函数使其能够被保存
   return useCallback(throttleFn, [leading, trailing, delay, fn]);
}


//处理单个页面标题的问题
export const useDocumentTitle = (title: string, keepOnUnMount = true) => {

   const oldTitle = useRef(document.title).current

   useEffect(() => {
     //每次title变化时就触发设置use effect
     document.title = title;
   }, [title])

   useEffect(() => {
      //clean
      return () => {
         if(!keepOnUnMount){
           //卸载完成后还原为文档旧标题
           document.title = oldTitle
         }
      }
   }, [keepOnUnMount, oldTitle])
}


//用来返回组件的挂载状态， 如果还没挂载或已卸载，则返回false，反之返回true
export const useMountedRef = () => {
  const mountedRef = useRef(false);
  
  useEffect(() => {
    mountedRef.current = true
    return () => {
      //组件卸载时的状况
      mountedRef.current = false
    }
  }, [])
  
  return  mountedRef 

}


//用reducer改写

//学习自带reducer的react hook
// export const useUndo = <T>(initialValue: T) => {
//   //  const [past, setPast] = useState<T[]>([]); //历史操作的合集
//   //  const [present, setPresent] = useState(initialValue);
//   //  const [future, setFuture] = useState<T[]>([]);
   

//    //合并状态防止依赖循环往复
//    const [ state, setState ] = useState<{
//      past: T[],
//      present: T,
//      future: T[]
//    }>({
//       past: [],
//       present:initialValue,
//       future: []
//    })

//    const canUndo = state.past.length !== 0; //往后跳
//    const canRedo = state.future.length !== 0; //往前跳

//    const undo = useCallback(() => {
//      setState(currentState => {
//         const {past,future, present} = currentState
//         if(past.length === 0) return currentState
        
//         const previous = past[past.length - 1]
//         const newPast = past.slice(0, past.length - 1); //注意 复制到最后一个元素的前面那个元素
//         return {
//           past: newPast,
//           present: previous,
//           future: [present, ...future]
//         }
//      })
//    }, [])

//    const redo = useCallback(() => {

//     setState(currentState => {
//       const {past,future, present} = currentState
//       if(future.length === 0) return currentState
      
//       const next = future[0];
//       const newFuture = past.slice(1)
//       return {
//         past: [...past, present],
//         present: next,
//         future: newFuture
//       }
//    })
//    }, [])

//    const set = useCallback((newPresent: T) => {
//       setState(currentState => {
//         const {past,future, present} = currentState
//         if(newPresent === present){
//           return currentState;
//         }
//         return {
//           past: [...past, present],
//           present: newPresent,
//           future: []
//         }
//       })
//    }, [])

//    const reset = useCallback((newPresent: T) => {
//      setState(currentState => {
//        return {
//         future: [],
//         past: [],
//         present: newPresent
//        }
//      })
//    },[])

//    return {
//     state
//    }
    
// }