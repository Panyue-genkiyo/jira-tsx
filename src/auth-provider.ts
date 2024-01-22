//如果在真实开发环境中，如果使用了firebase这种第三方服务的话，是不需要开发者来写的
import { User } from "./screens/project-list/search-panel"

const apiUrl = process.env.REACT_APP_API_URL


const localstorageKey = '__auth_provider_token__'

export const getToken = () => {
    return window.localStorage.getItem(localstorageKey)
}

export const handleUserResponse = ({ user} : { user: User }) => {
     window.localStorage.setItem(localstorageKey, user.token || '') 
     return user;
}

export const login = (data: {username: string, password: string}) => {
    return fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(async (r) => {
         if(r.ok){
            return handleUserResponse(await r.json())  
         }else{
            return Promise.reject(await r.json())
         }
      })
}



export const register = (data: { username: string, password: string }) => {
   return  fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(async (r) => {
         if(r.ok){
            return handleUserResponse(await r.json())  
         }else{
            return Promise.reject(await r.json())
         }
      })
}


export const logout = async () => {
    return window.localStorage.removeItem(localstorageKey) //移除token
}