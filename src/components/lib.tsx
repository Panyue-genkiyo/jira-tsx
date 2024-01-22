import styled from "@emotion/styled";
import { Spin, Typography, Button } from "antd";
import { DevTools } from "jira-dev-tool";


//常用组件

export const Row = styled.div<{
    gap?: number | boolean,
    between?: boolean,
    marginBottom?: number
}>`
    display: flex;
    align-items: center;
    justify-content: ${props => props.between ?  'space-between': undefined};
    margin-bottom: ${props => props.marginBottom ? props.marginBottom + 'rem' : undefined};
    >* {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined};
    }
`


const FullPage = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

//全局加载时使用的loading组件
export const FullPageLoading = () => (
    <FullPage>
        <Spin size="large"/>
    </FullPage>
)

//全局加载错误时显示错误信息
export const FullPageErrorFallback = ({error}: {error: Error | null}) => (
    <FullPage>
      <DevTools/>
      <Typography.Text type="danger">
         {error?.message}
      </Typography.Text>
    </FullPage>
)


//button的padding为0的组件
export const ButtonWitNoPadding = styled(Button)`
    padding: 0
`


//类型守卫
const isError = (value: any): value is Error => value?.message; //当符合后面条件时value就是Error类型

//只有当出现真正的error的时候才显示
export const ErrorBox = ({error}: {error: unknown}) => {
    if(isError(error)){
       return  <Typography.Text type="danger">{error.message}xx</Typography.Text>
    }
    return null;
}