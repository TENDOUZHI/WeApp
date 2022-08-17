import './index.scss'
import { DragEvent, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectRoot, selectSource, sourceSliceAction } from '@/store/source.slice'
import { useDispatch } from 'react-redux'
import { selectTarget, targetSliceAction } from '@/store/target.slice'
import { useCompile } from '@/hooks/useCompile'
interface vNode {
    tag: string,
    children: Array<string>
}
export const Canvas = () => {
    const source = useSelector(selectSource)
    const dispatch = useDispatch()
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
        
        // useCompile(root.current)

    }
    return (
        <div className="canvas-wrapper">
            <div className="device" ref={root} onDragOver={drag} onDrop={drop}></div>
        </div>
    )
}