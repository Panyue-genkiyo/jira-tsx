import styled from '@emotion/styled'
import SearchPanel from './search-panel'
import List from './list'
import { useDebounce } from '@/hooks/customHook'
import { Typography } from 'antd'
import { useProjects } from '@/utils/project'
import { useUsers } from '@/utils/user'
import { useProjectModal, useProjectsSearchParams } from './util'
import { ButtonWitNoPadding, ErrorBox, Row } from '@/components/lib'
// import { useDispatch } from 'react-redux'
// import { projectListAction } from '../../store/slices/project-list.slice'

export const ProjectList = () => {
  
  const [param, setParam] = useProjectsSearchParams();

 // const {isLoading, error, data: list, retry} = useProjects(useDebounce( param, 1000))
  const {isLoading, error, data: list}  = useProjects(useDebounce(param, 1000))

  const {data: users} = useUsers()
  
  const {open} = useProjectModal()

  // const dispatch = useDispatch();

  return (
     <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonWitNoPadding 
         // onClick={() => dispatch(projectListAction.openProjectModal())}>
           onClick={open}
          >创建项目
        </ButtonWitNoPadding>
      </Row>
      <SearchPanel param={param} setParam={setParam}/>
      {/* {error ? <Typography.Text type="danger">{error.message}xx</Typography.Text> : null} */}
      {/* <List refresh={retry} loading={isLoading} dataSource={list || []} users={users || []} /> */}
      <ErrorBox error={error}/>
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  )
}

ProjectList.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`