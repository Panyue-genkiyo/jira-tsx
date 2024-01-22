import qs from 'qs'
import * as auth from '@/auth-provider'

const apiUrl = process.env.REACT_APP_API_URL

export interface Config extends RequestInit{
    data?: object,
    token?: string
}

export const http = async (endPoint: string, {data, token, headers, ...customCofig}: Config = {}) => {
    const config = {
        method: 'GET',
        headers:{
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json': '',
        },
        ...customCofig
    }
    if(config.method.toUpperCase() === 'GET'){
        endPoint += `?${qs.stringify(data)}`
    }else{
        config.body = JSON.stringify(data || {})
    }
    //axios和fetch表现不同，当状态码不为2xx的时候，则会抛出异常，而fetch则不会
    return window.fetch(`${apiUrl}/${endPoint}`,  config)
    .then(async res => {
       if(res.status === 401){
          await auth.logout(); //无权限
          window.location.reload();
          return Promise.reject({message: '请重新登录'})
       }
       const data  = await res.json();
         if(res.ok){
            return data;
         }else{
            return Promise.reject(data)
         }
       
    })
}