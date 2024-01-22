import React from 'react'
import { Link } from 'react-router-dom'
import { Route, Routes, Navigate } from 'react-router'
import KanBan from '../kanban'
import Epic from '../epic'

function Project() {
    return (
        <div>
            <h1>Project Screen</h1>
            <Link to={'kanban'}>看板</Link>
            <Link to={'epic'}>任务组</Link>
            <Routes>
                <Route path={'/kanban'} element={<KanBan/>}/>
                <Route path={'/epic'} element={<Epic/>}/>
                {/* 上面两个无法匹配的话就跳转到看板 */}
                <Route path="*" element={<Navigate to={`${window.location.pathname}/kanban`}/>} />
            </Routes>
        </div>
    )
}

export default Project
