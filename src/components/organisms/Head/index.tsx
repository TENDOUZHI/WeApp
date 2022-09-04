import { Device } from '@/components/molecules/Device'
import { useCompile } from '@/hooks/useCompile'
import { selectDevice } from '@/store/device.slice'
import { selectVapp } from '@/store/routes.slice'
import { selectRoot } from '@/store/source.slice'
import axios from 'axios'
import { useSelector } from 'react-redux'
import './index.scss'
export const Head = () => {
    const root = useSelector(selectRoot)
    const device = useSelector(selectDevice)
    const vapp = useSelector(selectVapp)
    const click = () => {
        let width = device.width
        const payload = useCompile(root, width, true)
        // console.log(payload);
        // axios.post('/vnode', payload).then((res) => {
        //     console.log(res);
        // })
        console.log(vapp);
        axios.post('/vapp', vapp).then((res) => {
            console.log(res);
        })
    }

    const clear = () => {
        localStorage.clear()
        location.reload()
    }

    return (
        <>
            <div className="head">
                <div>Title</div>
                <button className='btn' onClick={click}>Shoe Log</button>
                <Device />
                <div className='clear' onClick={clear}>clear</div>
            </div>
        </>
    )
}