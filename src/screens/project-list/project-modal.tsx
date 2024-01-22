import { Drawer, Button } from 'antd'
import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { projectListAction, selectProjectModalOpen} from '../../store/slices/project-list.slice';
import { useProjectModal } from './util';

const ProjectMode = () => {

  // const dispatch = useDispatch();

  // const projectModalOpen = useSelector(selectProjectModalOpen)
  
  //利用url参数来管理状态
  const {projectModalOpen, close} = useProjectModal();
  
  return (
    <Drawer 
        width={'100%'} 
        open={projectModalOpen}
        // onClose={() => dispatch(projectListAction.closeProjectModal())}
        onClose={close}
    >
       <h1>project model</h1>
       <Button 
       //onClick={// () => dispatch(projectListAction.closeProjectModal()}>
       onClick={close}

        >关闭</Button>
    </Drawer>
  )
}

export default ProjectMode