import React, { useState } from 'react'
import styled from '@emotion/styled';
import Login from './login';
import Register from './register';
import { Button, Card, Divider, Typography } from 'antd';
import logo from '@/assets/logo.svg'
import left from '@/assets/left.svg'
import right from '@/assets/right.svg'

const Unauthenticated = () => {

  const [isRegister, setIsRegister] = useState(false);  

  //用来判断是否需要出现提示错误信息
  const [error, setError] = useState<Error | null>(null);

  return (
    <Background>
       <Container>
        <Header/>
        <ShadowCard>
          <Title>
            {isRegister ? '请注册' : '请登录'}
          </Title>
          {error ? <Typography.Text style={{display:'inline-block',marginBottom: '2rem'}} type="danger">{error.message}</Typography.Text>: null}
          {isRegister ? <Register onError={setError}/> : <Login onError={setError}/>}
          <Divider/>
          <Button type={'link'} onClick={() => setIsRegister(!isRegister)}>{isRegister ? '已经有账号啦？直接登陆吧' : '没有账号？注册新账号'}</Button>  
        </ShadowCard>
      </Container>
    </Background>
  )
}

export const LongButton = styled(Button)`
  width: 100%;
`

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94,108,132)
`

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position:  left bottom, right bottom;
  background-size: calc( ( (100vw - 40rem) / 2 ) - 3.2rem),  calc( ( (100vw - 40rem) / 2 ) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    min-height: 100vh;
`
const ShadowCard = styled(Card)`
   width: 40rem;
   min-height: 56rem;
   padding: 3.2rem 4rem;
   border-radius: 0.3rem;
   box-sizing: border-box;
   box-shadow: rgba(0,0,0,0.1) 0 0 10px;
   text-align: center;
`

export default Unauthenticated