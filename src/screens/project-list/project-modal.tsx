/** @jsxImportSource @emotion/react */
import { Drawer, Button, Spin, Form, Input } from 'antd'
import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { projectListAction, selectProjectModalOpen} from '../../store/slices/project-list.slice';
import { useProjectModal, useProjectQueryKey } from './util';
import { UserSelect } from '@/components/user-select';
import { useAddProject, useEditProject } from '@/utils/project';
import { useForm } from 'antd/lib/form/Form';
import { ErrorBox } from '@/components/lib';
import styled from '@emotion/styled';


const ProjectMode = () => {

  // const dispatch = useDispatch();

  // const projectModalOpen = useSelector(selectProjectModalOpen)
  
  //利用url参数来管理状态
  //在编辑和创建新project模态框都会被打开
  //isLoading代表要编辑的同时， 项目的详情正在获取当中
  const {projectModalOpen, close, editingProject, isLoading } = useProjectModal();
  const title = editingProject ? '编辑项目' : '创建项目'
  const useMutateProject = editingProject ? useEditProject : useAddProject

  const {mutateAsync, error, isLoading: mutateLoading} = useMutateProject(useProjectQueryKey());

  const [form] = useForm();

  //{name: ...., organization: ..., personId: ....}
  const onFinish = (values: any) => {
     mutateAsync({...editingProject, ...values}).then(() => {
       //编辑完成重置表单
       form.resetFields();
       close()
     })
  }

  useEffect(() => {
    //如果存在编辑的project，则按照project字段来填充form
     form.setFieldsValue(editingProject)
  }, [editingProject, form])


  return (
    <Drawer
        forceRender={true} 
        width={'100%'} 
        open={projectModalOpen}
        // onClose={() => dispatch(projectListAction.closeProjectModal())}
        onClose={close}
    >
      <Container>
        {
          isLoading ? <Spin size={'large'}/> : <>
            <h1>{title}</h1>
            <ErrorBox error={error}/>
            <Form form={form} layout='vertical' style={{ width:'40rem' }} onFinish={onFinish}>
                <Form.Item label="名称" name={'name'} rules={[{ required: true, message: '请输入项目名' }]}>
                  <Input placeholder='请输入项目名称'/>
                </Form.Item>
                <Form.Item label="部门" name={'organization'} rules={[{ required: true, message: '请输入部门名' }]}>
                  <Input placeholder='请输入部门名'/>
                </Form.Item>
                <Form.Item label="负责人" name={'personId'}>
                  {/* <Input placeholder='请输入项目名称'/> */}
                  <UserSelect defaultOptionName={'负责人'}/>
                </Form.Item>
                <Form.Item css={{textAlign: 'right'}}>
                  <Button loading={mutateLoading} type={'primary'} htmlType='submit'>提交</Button>
                </Form.Item>
            </Form>
          </>
        }
        {/* <h1>project model</h1> */}
        {/* <Button 
        //onClick={// () => dispatch(projectListAction.closeProjectModal()}>
        onClick={close}>关闭</Button> */}
      </Container>
    </Drawer>
  )
}


const Container = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export default ProjectMode