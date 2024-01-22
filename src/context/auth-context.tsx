import React, { ReactNode, useCallback, useContext } from "react";
import * as auth from '@/auth-provider'
import { User } from "@/screens/project-list/search-panel";
import { http } from "@/utils/http";
import { useMount } from "@/hooks/customHook";
import { useAsync } from "@/hooks/use-async";
import { FullPageErrorFallback, FullPageLoading } from "@/components/lib";
import * as authStore from '@/store/slices/auth.slice'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";


export interface AuthForm{
    username: string,
    password: string
}

// const AuthContext = React.createContext<{
//      user: User | null,
//      logout: () => Promise<void>,
//      login: (form: AuthForm) => Promise<void>
//      register: (form: AuthForm) => Promise<void>
// } | undefined>(undefined);

// AuthContext.displayName = 'AuthContext'

//在登录之后刷新页面，user信息会丢 所以要初始化user，避免刷新后自动登出
export const bootStrapUser = async () => {
    let user = null;
    const token = auth.getToken();
    if(token){
        const data = await http('me', {token});
        user = data.user
    }
    return user
}

export const AuthProvider = ({children}: {children: ReactNode}) => {
    //处理
    // const [user, setUser] = useState<User | null>(null);
    //const {data: user, error, isIdle, isLoading, isError, run, setData: setUser} = useAsync<User | null>();
    const {error, isIdle, isLoading, isError, run} = useAsync<User | null>();
    // const login =  useCallback((form: AuthForm) => auth.login(form).then(setUser), [setUser])
    // const logout = () => auth.logout().then(() => setUser(null))
    // const register = (form: AuthForm) => auth.register(form).then(setUser)

    const dispatch: (...args: unknown[]) => Promise<User> = useDispatch<AppDispatch>();

    //自定义hook，整个组件树一挂载就重写登录信息 防止有user，却会到登录页面
    useMount(() => {
        // run(bootStrapUser())
        run(dispatch(authStore.bootStrap()))
    })

    if(isIdle || isLoading){
        return <FullPageLoading/>
    }

    if(isError){
        return <FullPageErrorFallback error={error}/>
    }
    

    // return <AuthContext.Provider value={{ user, login, logout, register}}>
    //     {children}
    // </AuthContext.Provider>
    return (
        <div>
            {children}
        </div>
    )
}

export const useAuth = () => {
    //下面是用context来管理全局user信息
    // const context = useContext(AuthContext)
    // if(!context){
    //     //没有在provider中使用的都会为undefind
    //     throw new Error('useAuth必须在AuthProvider中使用')
    // }else{
    //     return context
    // }
    //下面用react-redux和redux-thunk来全局保存user信息
    const dispatch = useDispatch<AppDispatch>();
    //要返回自己的对象或函数时刻注意又可能造成每次渲染都导致产生“新的”从而导致无限循环， 所以注意缓存
    const user = useSelector(authStore.selectUser) as User | null;
    const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch])
    const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch])
    const logout = useCallback(() => dispatch(authStore.logout()), [dispatch])

    return {
        login,
        register,
        logout,
        user
    }
    
}