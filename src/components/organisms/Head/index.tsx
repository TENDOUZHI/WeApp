import { useCompile } from '@/hooks/useCompile'
import { selectRoot } from '@/store/source.slice'
import axios from 'axios'
import { useSelector } from 'react-redux'
import './index.scss'
export const Head = () => {
    const root = useSelector(selectRoot)
    const click = () => {
        const payload = useCompile(root)
        // console.log(payload);
        
        axios.post('/vnode', payload).then(res => {
            console.log(res);
        })
        // axios.get('/').then(res => {
        //     console.log(res)
        // })
    }

    return (
        <>
            <div className="head">
                <div>Title</div>
                <button className='btn' onClick={click}>Shoe Log</button>
            </div>
        </>
    )
}