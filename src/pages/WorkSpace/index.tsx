import { Canvas } from '@/components/organisms/Canvas'
import { Head } from '@/components/organisms/Head'
import { LeftList } from '@/components/organisms/LeftList'
import { Loading } from '@/components/organisms/Loading'
import { RighttList } from '@/components/organisms/RightList'
import { routesSliceAction } from '@/store/vapp.slice'
import { wsSliceAction } from '@/store/ws.slice'
import axios from 'axios'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import './index.scss'
export const WorkSpace = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const [programData, setProgramData] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const ws = useRef<WebSocket>(new WebSocket('ws://127.0.0.1:8080/program/ws'));
    // @ts-ignore
    const [programId, setProgramId] = useState<number>(location.state.id)
    useEffect(() => {
        document.title = 'Ferris-工作台'
        console.log(ws.current);
        ws.current.onopen = () => {
            setLoading(false)
        }
        
        dispatch(wsSliceAction.initialWs(ws.current))
        dispatch(routesSliceAction.initialProgramId(programId))
    })
    return (
        <div className='home'>
            <Loading loading={loading}/>
            <Head id={programId} />
            <div className='home-content'>
                <LeftList program_id={programId}/>
                <Canvas programData={programData} program_id={programId}/>
                <RighttList/>
            </div>

        </div>
    )
}