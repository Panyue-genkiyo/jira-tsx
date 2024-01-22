import { useAuth } from '@/context/auth-context'
import { Form, Input } from 'antd'
import { LongButton } from '.'
import { useAsync } from '@/hooks/use-async';
import { useThrottle } from '@/hooks/customHook';


const Register = ({ onError }: {onError: (e: Error) => void }) => {

  const {register} = useAuth();

  const {run, isLoading} = useAsync(undefined, {
    ifThrowError: true
  })
  
  const handleSubmit = useThrottle(async ({cpassword, ...values}: {username: string, password: string, cpassword: string}) => {

    if(cpassword !== values.password){
      onError(new Error('请确认两次输入的密码相同'));
      return;
    }
    //阻止表单提交的默认行为
    //注意异步有可能会捕获不到error，除非该函数是async await register的处理才能捕获到该错误
    try{
      await run(register(values)) 
    }catch(error){
      onError(error as Error)
    }
    // register(value).catch(onError)
  })

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder='用户名' type='text' id='username' />
      </Form.Item>
      <Form.Item name={'password'} rules={[{required: true, message: '请输入密码'}]}>
        <Input placeholder='密码' type='password' id='password' autoComplete='on' />
      </Form.Item>
      <Form.Item name={'cpassword'} rules={[{required: true, message: '请确认刚才输入的密码'}]}>
        <Input placeholder='确认密码' type='password' id='cpassword' autoComplete='on' />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType='submit' type='primary'>注册</LongButton>
      </Form.Item>
    </Form>
  )
}

export default Register