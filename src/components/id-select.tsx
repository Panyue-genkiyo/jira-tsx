import { Raw } from '@/types'
import { Select } from 'antd'
import React from 'react'
// import { User } from '@/screens/project-list/search-panel'


//将原有antd里的select的属性全部移交过来
type SelectProps = React.ComponentProps<typeof Select>

//用来选id的select
interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'>{
   value?:  Raw | null | undefined
   onChange?: (value?: number) => void
   //默认值
   defaultOptionName?: string 
   options?: {
    name: string,
    id: number
   }[]
}

//value会传多种类型的值 onChange只会回调number ｜ undefined类型 当isNaN(Number(value))为true时，代表选择默认类型
//当选择默认值时，onChange会回调undefined
const IdSelect = (props: IdSelectProps) => {
   const { value, onChange, defaultOptionName, options, ...restProps } = props; 
  return (
    <Select 
    value={options?.length ? toNumber(value) : 0} 
    onChange={value => onChange?.(toNumber(value) || undefined)}
    {...restProps}
    >
        {
            defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null
        }
        {
            options?.map(option => (
                <Select.Option value={option.id} key={option.id}>
                    {option.name}
                </Select.Option>
            ))
        }
    </Select>
  )
}

///将value转化为数字
const toNumber = (val: unknown) => {
    return isNaN(Number(val)) ? 0 : Number(val);
}


export default IdSelect