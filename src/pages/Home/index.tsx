import { Canvas } from '@/components/organisms/Canvas'
import { Head } from '@/components/organisms/Head'
import { LeftList } from '@/components/organisms/LeftList'
import { RighttList } from '@/components/organisms/RightList'
import './index.scss'
export const Home = () => {
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