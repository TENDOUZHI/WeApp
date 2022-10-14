import { Canvas } from '@/components/organisms/Canvas'
import { Head } from '@/components/organisms/Head'
import { LeftList } from '@/components/organisms/LeftList'
import { RighttList } from '@/components/organisms/RightList'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './index.scss'
export const WorkSpace = () => {
    const location = useLocation()
    const [programData, setProgramData] = useState<string>('')
    const [loaded, setLoaded] = useState<boolean>(false)
    // @ts-ignore
    const [programId, setProgramId] = useState<number>(location.state.id)
    useEffect(() => {
        // const id = location.state.id
        // selectData(programId)
    }, [])
    
    return (
        <div className='home'>
            <Head />
            {
                <div className='home-content'>
                    <LeftList />
                    <Canvas programData={programData} id={programId} />
                    <RighttList />
                </div>
            }

        </div>
    )
}