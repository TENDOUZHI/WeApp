import { useCompile } from '@/hooks/useCompile'
import { device, deviceSliceAction, selectDevice, selectDeviceList } from '@/store/device.slice'
import { selectRoot } from '@/store/source.slice'
import { routesSliceAction, selectCurRoutes } from '@/store/vapp.slice'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import arrow from '@/assets/arrow.png'
import './index.scss'
export const Device = () => {
    const dispatch = useDispatch()
    const device = useSelector(selectDevice)
    const deviceList = useSelector(selectDeviceList)
    const current = useSelector(selectCurRoutes)
    const root = useSelector(selectRoot)
    const choice = useRef<any>()
    const arrowRef = useRef<any>()
    const listItem = deviceList.map((item) => <li
        onClick={(e) => { updateDevice(item); toggle }}
        className=''
        key={item.id}
    >{item.name}</li>)
    const [show, setShow] = useState<boolean>(false)
    const toggle = () => {
        // if show == false ,show list
        if (!show) {
            setShow(true)
            choice.current.classList.remove('none')
            arrowRef.current.classList.add('rotate')
            setTimeout(() => {
                choice.current.classList.add('show-choice')
                const curVnode = {
                    id: current.id,
                    vNode: useCompile(root, device.width, false)
                }
                const curWnode = {
                    id: current.id,
                    vNode: useCompile(root, device.width, true)
                }
                dispatch(routesSliceAction.updateVnode({ curVnode, curWnode }))
                document.addEventListener('click', autoHide)
            }, 10)
        }
    }
    const autoHide = (e: MouseEvent) => {
        if (e.target !== choice.current) {
            setShow(false)
            arrowRef.current.classList.remove('rotate')
            choice.current.classList.remove('show-choice')
            setTimeout(() => {
                choice.current.classList.add('none')
            }, 100)
            document.removeEventListener('click', autoHide)
        }

    }


    const updateDevice = (device: device) => {
        dispatch(deviceSliceAction.captureDevice(device))
    }
    return (
        <div className="device-list">
            <div className="device-list-title" onClick={toggle}>
                <div className="device-list-title-main">{device.name}</div>
                <div className="device-list-title-img" ref={arrowRef}>
                    <img src={arrow} alt="" />
                </div>
            </div>
            <div className="device-list-choice none" ref={choice}>
                <ul>
                    {listItem}
                </ul>
            </div>
        </div>
    )
}