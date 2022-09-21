import { Device } from '@/components/molecules/Device'
import { Vapp } from '@/store/ast'
import { routesSliceAction, selectCurRoutes, selectVapp, selectWapp } from '@/store/vapp.slice'
import axios from 'axios'
import { useSelector } from 'react-redux'
import './index.scss'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { targetSliceAction } from '@/store/target.slice'
export const Head = () => {
    const dispatch = useDispatch()
    const vapp = useSelector(selectVapp)
    const wapp = useSelector(selectWapp)
    const bar = useRef<any>()
    // const layer = useRef<any>()
    const [title, setTitle] = useState<string>(vapp.project_name)
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('vapp') as string) as Vapp
        if (data !== null) {
            setTitle(data.project_name)
        }
        // dispatch(targetSliceAction.initialLayer(layer.current))
    }, [])
    const click = async () => {
        await axios.post('/vapp', wapp).then((res) => {
            console.log(res);
        })
    }
    const clear = () => {
        localStorage.clear()
        location.reload()
    }
    const selectTitle = () => {
        bar.current.classList.add('show-bar')
    }
    const blurTitle = () => {
        bar.current.classList.remove('show-bar')
        dispatch(routesSliceAction.updateProjectName(title))
    }
    const updateTitle = (e: { target: { value: any } }) => {
        setTitle(e.target.value)
    }

    return (
        <>
            <div className="head">
                {/* <div className="layer" ref={layer}></div> */}
                <div className='head-title'>
                    <input className='head-title-input' type="text"
                        value={title}
                        onChange={updateTitle}
                        onFocus={selectTitle}
                        onBlur={blurTitle} />
                    <div className="bar" ref={bar}></div>
                </div>
                <div className="device">
                    <Device />
                </div>
                <div className="etc">
                    <button className='btn' onClick={click}>Shoe Log</button>
                    <div className='clear' onClick={clear}>clear</div>
                </div>

            </div>
        </>
    )
}