import { useUsers } from '@/utils/user'
import React from 'react'
import IdSelect from './id-select';

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
    const { data: users } = useUsers();
    
    return (
        <IdSelect options={users || []} {...props}>
        </IdSelect>
        // <>
        // </>
    )
}

