import { useCompile } from '@/hooks/useCompile'
import { device, deviceSliceAction, selectDevice, selectDeviceList } from '@/store/device.slice'
import { selectRoot } from '@/store/source.slice'
import { routesSliceAction, selectCurRoutes } from '@/store/vapp.slice'
import { MouseEvent, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import './index.scss'
export const Device = () => {
    const dispatch = useDispatch()
    const device = useSelector(selectDevice)
    const deviceList = useSelector(selectDeviceList)
    const current = useSelector(selectCurRoutes)
    const root = useSelector(selectRoot)
    const choice = useRef<any>()
    const layer = useRef<any>()
    const listItem = deviceList.map((item) => <li
        onClick={(e) => { updateDevice(item); toggle(e) }}
        className=''
        key={item.id}
    >{item.name}</li>)
    const [show, setShow] = useState<boolean>(false)
    const toggle = (e: MouseEvent) => {
        setShow(!show)
        // if show == false ,show list
        if (show) {
            choice.current.classList.remove('show-choice')
            setTimeout(() => {
                choice.current.classList.add('none')
                layer.current.classList.add('none')
            }, 100)
        } else {
            choice.current.classList.remove('none')
            layer.current.classList.remove('none')
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
            }, 10)

        }
    }


    const updateDevice = (device: device) => {
        dispatch(deviceSliceAction.captureDevice(device))
    }
    return (
        <div className="device-list">
            <div className="layer none" ref={layer} onClick={toggle}></div>
            <div className="device-list-title" onClick={toggle}>{device.name}</div>
            <div className="device-list-choice none" ref={choice}>
                <ul>
                    {listItem}
                </ul>
            </div>
        </div>
    )
}