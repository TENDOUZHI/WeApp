import { Canvas } from '@/components/organisms/Canvas'
import { Head } from '@/components/organisms/Head'
import { LeftList } from '@/components/organisms/LeftList'
import { RighttList } from '@/components/organisms/RightList'
import axios from 'axios'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './index.scss'
export const WorkSpace = () => {
    const location = useLocation()
    console.log(location.state);
    useEffect(() => {
        // const id = location.state.id
        // @ts-ignore
        selectData(location.state.id)
    })
    const selectData = async (id:number) => {
        const payload = {
            id
        }
        await axios.post('/programlist/data',payload).then(res => {
            console.log(res);
        })
    }
    // auto hide jump layer
    // document.onclick = (e: MouseEvent) => {
        
    //     console.log(e.target);
    // }
    return (
        <div className='home'>
            <Head />
            <div className='home-content'>
                <LeftList />
                <Canvas />
                <RighttList />
            </div>

        </div>
    )
}