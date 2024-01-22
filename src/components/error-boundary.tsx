//错误边界
//class 组件

//捕获全部操作

import React from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement

export class ErrorBoundary extends React.Component<React.PropsWithChildren<{fallbackRender: FallbackRender}>, {error: Error | null}>{  
   
    state = {
     error: null
   }

   static getDerivedStateFromError(error: Error){
     //子组件发生异常，会接受到error返回error对象
     return {
        error
     }
   }
   
   render(){
     const { error } = this.state;
     const { fallbackRender, children } = this.props;
     if(error){
        return fallbackRender({error});
     }
     //没有error就返回子组件正常渲染
     return children
   }
   
   
}