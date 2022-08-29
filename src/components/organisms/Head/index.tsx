import { Device } from '@/components/molecules/Device'
import { useCompile } from '@/hooks/useCompile'
import { selectDevice } from '@/store/device.slice'
import { selectRoot } from '@/store/source.slice'
import axios from 'axios'
import { useSelector } from 'react-redux'
import './index.scss'
export const Head = () => {
    const root = useSelector(selectRoot)
    const device = useSelector(selectDevice)
    const click = () => {
        let width = device.width
        const payload = useCompile(root,width)
        console.log(payload);
        
        // axios.post('/vnode', payload).then(res => {
        //     console.log(res);
        // })
    }

    return (
        <>
            <div className="head">
                <div>Title</div>
                <button className='btn' onClick={click}>Shoe Log</button>
                <Device/>
            </div>
        </>
    )
}