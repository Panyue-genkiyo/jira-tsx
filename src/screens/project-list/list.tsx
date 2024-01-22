import { Dropdown, Modal, Table, TableProps } from 'antd'
import { User } from './search-panel'
import dayjs from 'dayjs'
 
//react-router-dom 和 react-router 类似于 react-dom 和 react类似(react-router管理路由) react-router-dom是与dom宿主强关联的， 处理浏览器
import { Link } from 'react-router-dom'
import Pin from '@/components/pin'
import { useDeleteProject, useEditProject } from '@/utils/project'
import { ButtonWitNoPadding } from '@/components/lib'
import { useProjectModal, useProjectQueryKey } from './util'
import Project from '../project'

export interface Project {
  id: number
  name: string
  personId: number 
  organization: string
  pin: boolean,
  created?: number
}

interface ListProps extends TableProps<Project>{
  users: User[],
  refresh?: () => void
}

const List = ({ users, ...props }: ListProps) => {

  // const { mutate } = useEditProject();
  const { mutate } = useEditProject(useProjectQueryKey()); 
  // console.log(props.refresh)

  //函数柯里化， 先消耗id再消耗pin
  const pinProject = (id: number) => (pin: boolean) => mutate({id, pin})

  //点击收藏之后，先更新收藏状态，再次请求
  
  // const dispatch = useDispatch()

  
  return (
    <Table pagination={false} rowKey={pj => pj.id} columns={[
      {
        title:  <Pin checked={true} disabled={true}/>,
        render(_, project){
           return <Pin checked={project.pin} onCheckChange={pinProject(project.id)}/>
        }
      }
      ,
      {
      title: '名称',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render(_, project){
        return (
          <Link to={String(project.id)}>{project.name}</Link>
        )
      }
    },
    {
      title: '部门',
      dataIndex: 'organization',
    },
    {
      title: '负责人',
      render(_, project){
        return <span>
          {users.find((user) => user.id === project.personId)?.name || '未知'}
        </span>
      }
    },{
      title: '创建时间',
      render(_, project){
        return <span>
           {project.created ? dayjs(project.created).format('YYYY-MM-DD'): '无'}
        </span>
      }
    },{
      render(_, project){
         return <More project={project}/>
      }
    }
   ]} {...props}>
    </Table>
  )
}


const More = ({project}: {project: Project}) => {

  const {startEdit} = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);
  const { mutate: deleteProject } = useDeleteProject(useProjectQueryKey());

  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
       title: '确定删除这个项目吗',
       content: '点击确定删除',
       okText: '确定',
       onOk(){
         deleteProject({id:project.id})
       }
      })
  } 

   return (
    <Dropdown menu={{
      items: [
        {
           key: 'edit',
          // label: <ButtonWitNoPadding type="link" onClick={() => dispatch(projectListAction.openProjectModal())}>编辑</ButtonWitNoPadding>
          label: <ButtonWitNoPadding type="link" onClick={editProject(project.id)}>编辑</ButtonWitNoPadding>
        },
        {
          key: 'delete',
          label:  <ButtonWitNoPadding type="link" onClick={() => confirmDeleteProject(project.id)}>删除</ButtonWitNoPadding>  
        }
      ]
   }}>
      <ButtonWitNoPadding type={'link'}>...</ButtonWitNoPadding>
   </Dropdown>
   )
}

export default List
