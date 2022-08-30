import './index.scss'
import { DragEvent, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectSource, sourceSliceAction } from '@/store/source.slice'
import { useDispatch } from 'react-redux'
import { targetSliceAction } from '@/store/target.slice'
import { useCompile } from '@/hooks/useCompile'
import { routesSliceAction, selectCurRoutes, selectRoutes } from '@/store/routes.slice'
import { selectDevice } from '@/store/device.slice'
export const Canvas = () => {
    const dispatch = useDispatch()
    const current = useSelector(selectCurRoutes)
    const source = useSelector(selectSource)
    const device = useSelector(selectDevice)
    const route = useSelector(selectRoutes)
    const root = useRef<any>(null)
    // clone the HTMLElement
    const newSource = source?.cloneNode(true) as HTMLElement
    // record the number of element in canvas
    const [num, setNum] = useState<number>(0)
    const drag = (e: DragEvent) => {
        e.preventDefault()
    }
    useEffect(() => {
        dispatch(sourceSliceAction.initialRoot(root.current))
    }, [])
    const drop = (e: DragEvent) => {
        const target = e.target as HTMLElement
        newSource.draggable = false
        newSource.addEventListener('click', (e: MouseEvent) => {
            dispatch(targetSliceAction.captureTarget(e.target))
        })
        newSource.classList.add(newSource.nodeName + num)
        setNum(num + 1)
        target.appendChild(newSource as Node)
        dispatch(sourceSliceAction.clearSource())
        // update route vNode to redux
        const curVnode = {
            id: current.id,
            vNode: useCompile(root.current,device.width)
        }
        dispatch(routesSliceAction.updateVnode(curVnode))
        // console.log(root.current.innerHTML)
        
    }
    
    return (
        <div className="canvas-wrapper">
            <div className="device" ref={root} onDragOver={drag} onDrop={drop}></div>
        </div>
    )
}