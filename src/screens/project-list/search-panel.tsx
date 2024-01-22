/** @jsxImportSource @emotion/react */
import { Form, Input } from "antd"
import { Project } from "./list"
import { UserSelect } from "@/components/user-select"

export interface User {
  id:number,
  name: string
  email: string
  title: string
  organization: string,
  token: string
}

interface SearchPanelProps {
  param: Partial<Pick<Project, 'name'| 'personId'>>
  setParam: (param: SearchPanelProps['param']) => void
}

const SearchPanel = ({ param, setParam }: SearchPanelProps) => {
  return (
    <Form css={{marginBottom: '2rem'}} layout="inline">
      <Form.Item>
        <Input type='text' placeholder={'项目名'} value={param.name} onChange={(e) => setParam({ ...param, name: e.target.value })} />
      </Form.Item>
      <Form.Item>
        <UserSelect defaultOptionName="负责人" onChange={(value) => setParam({...param, personId: value})} value={param.personId}/>
      </Form.Item>
    </Form>
  )
}

export default SearchPanel
