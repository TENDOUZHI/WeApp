import { Canvas } from '@/components/organisms/Canvas'
import { Head } from '@/components/organisms/Head'
import { LeftList } from '@/components/organisms/LeftList'
import { RighttList } from '@/components/organisms/RightList'
import { routesSliceAction, selectVapp } from '@/store/routes.slice'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import './index.scss'
export const Home = () => {
    // const dispatch = useDispatch()
    // const vapp = useSelector(selectVapp)
    // useEffect(() => {
    //    dispatch(routesSliceAction.retriveDom())
    // console.log(vapp); 
    // },[])
    
    
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