/** @jsxImportSource @emotion/react */
import React from 'react'
import { useAuth } from '@/context/auth-context';
import { ProjectList } from '@/screens/project-list';
import styled from '@emotion/styled';
import { ButtonWitNoPadding, Row } from '@/components/lib'
import { ReactComponent as  SoftwareLogo }  from '@/assets/software-logo.svg'
import { Button, Dropdown } from 'antd';
import { useDocumentTitle } from '@/hooks/customHook';
import { Navigate, Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import Project from '@/screens/project';
import { resetRouter } from '@/utils';
import ProjectMode from '@/screens/project-list/project-modal';
import ProjectPopover from '@/components/project-popover';


//登录后的页面
const Authenticated = () => {
  
  useDocumentTitle('项目列表', false);

  // const [projectModelOpen, setProjectModelOpen] = useState(false);
  
  return (
    <div>
      <Container>
        <Router>
            <PageHeader/>
            <Main> 
                <Routes>
                  <Route path='/projects' element={<ProjectList/>}/>
                  <Route path='/projects/:projectId/*' element={<Project/>}/>
                  <Route path='*' element={<Navigate to={'/projects'}/>}/>
                </Routes>
            </Main>
            <ProjectMode/>
        </Router>
      </Container>
    </div>
  )
  
}

const PageHeader =  () =>  {
  return (
    <Header between={true}>  
    <HeaderLeft gap={true}>
      <ButtonWitNoPadding type={'link'} onClick={resetRouter}>
        <SoftwareLogo width={'18rem'} color='rgb(38, 132, 255)'/>
      </ButtonWitNoPadding>
      <ProjectPopover/>
      <span>用户</span>
    </HeaderLeft>
    <HeaderRight>
      <User/>
    </HeaderRight>
  </Header>   
  )
}

const User = () => {
   const { logout, user } = useAuth();
   return (
    <Dropdown menu={{
      items: [
        {
          key: 'logout',
          label: (
            <Button type={'link'} onClick={logout}>登出</Button>
          )
        }
      ]
    }}>
      <Button type={'link'} onClick={(e) => e.preventDefault()}>{user?.name}</Button>
    </Dropdown>
   )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`

const Header = styled(Row)`
  /* height: 6rem; */
  /* background: grey; */
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0,0,0, .1);
  z-index: 1
`

const HeaderLeft = styled(Row)`
  
`

const HeaderRight = styled.div`
  
`

const Main = styled.main`
`

export default Authenticated