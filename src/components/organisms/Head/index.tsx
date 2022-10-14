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
    const [title, setTitle] = useState<string>(vapp.project_name)
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('vapp') as string) as Vapp
        if (data !== null) {
            setTitle(data.project_name)
        }
        // dispatch(targetSliceAction.initialLayer(layer.current))
    }, [])
    const click = async () => {
        console.log(wapp);
        
        await axios.post('/vapp', wapp, { responseType: 'blob' }).then((res) => {
            // console.log(res);
            const blob = new Blob([res.data], { type: 'application/zip' })
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            const name = wapp.project_name + '.zip'
            link.setAttribute('download', name);
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(url) //realease memory
        })
    }
    const clear = () => {
        localStorage.removeItem('vapp')
        localStorage.removeItem('wapp')
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
                    
                    <button className='btn' onClick={click}>Show Log</button>
                    <div className='clear' onClick={clear}>clear</div>
                </div>

            </div>
        </>
    )
}