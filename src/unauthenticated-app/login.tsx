import { useCallback } from 'react'; 
import { useAuth } from '@/context/auth-context'
import { Form, Input} from 'antd'
import { LongButton } from '.';
import { useAsync } from '@/hooks/use-async';
import { useThrottle } from '@/hooks/customHook';
import { useDispatch } from 'react-redux';


const Login = ({onError}: { onError: (e: Error) => void }) => {

  const {login, user} = useAuth();

  const {run, isLoading} = useAsync(undefined, {
    ifThrowError: true
  })

  const handleSubmit = useThrottle(useCallback(async (values: { username: string, password: string }) => {
    
    try{
      await run(login(values)) 
    }catch(error){
      onError(error as Error)
    }
  }, [run, login, onError]))

  // const dispatch = useDispatch();

  return (
    <>
      {user ? `登录成功，登录名${user.name} token: ${user.token}`: <div></div>}
        <Form onFinish={handleSubmit}>
          <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
              <Input placeholder='用户名' type='text' id='username' />
          </Form.Item>
          <Form.Item name={'password'} rules={[{required: true, message: '请输入密码'}]}>
              <Input placeholder='密码' type='password' id='password' autoComplete='on' />
          </Form.Item>
          <Form.Item name={'button'}>
              <LongButton loading={isLoading} htmlType='submit' type={'primary'}>登录</LongButton>
          </Form.Item>
        </Form>
    </>
  )
}

export default Login
