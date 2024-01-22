import { useProjects } from '@/utils/project'
import styled from '@emotion/styled';
import { Divider, List, Popover, Typography } from 'antd'
import React from 'react'
import { ButtonWitNoPadding } from './lib';
import { useProjectModal } from '@/screens/project-list/util';

const ProjectPopover = () => {
  
  const { data: projects } = useProjects();

  const pinnedProjects = projects?.filter(pj => pj.pin); //已收藏的项目
  
  const { open } = useProjectModal();

  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
         {
           pinnedProjects?.map(pj => (
            <List.Item key={pj.id}>
               <List.Item.Meta title={pj.name}/>
            </List.Item>
           ))
         }
      </List>
      <Divider/>
      <ButtonWitNoPadding type="link" onClick={open}>创建项目</ButtonWitNoPadding>
    </ContentContainer>
  )

  return (
     <Popover placement='bottom' content={content}>
        项目
     </Popover>
  )
}


const ContentContainer = styled.div`
   min-width: 30rem;
`

export default ProjectPopover