import { useCompile } from '@/hooks/useCompile'
import { selectRoot } from '@/store/source.slice'
import { useSelector } from 'react-redux'
import './index.scss'
export const Head = () => {
    const root = useSelector(selectRoot)
    const click = () => {
        useCompile(root)
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