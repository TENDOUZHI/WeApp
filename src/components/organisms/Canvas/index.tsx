import './index.scss'
import { DragEvent, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectSource, sourceSliceAction } from '@/store/source.slice'
import { useDispatch } from 'react-redux'
import { selectTarget, targetSliceAction } from '@/store/target.slice'
export const Canvas = () => {
    const source = useSelector(selectSource)
    const dispatch = useDispatch()
    // clone the HTMLElement
    const newSource = source?.cloneNode(true) as HTMLElement
    // record the number of element in canvas
    const [num, setNum] = useState<number>(0)
    const drag = (e: DragEvent) => {
        e.preventDefault()
    }
    const drop = (e: DragEvent) => {
        const target = e.target as HTMLElement
        newSource.draggable = false
        newSource.addEventListener('click',(e: MouseEvent) => {
            // capture the target that clicked
            dispatch(targetSliceAction.captureTarget(e.target))
        })
        newSource.classList.add(newSource.nodeName + num)
        setNum(num  + 1)
        target.appendChild(newSource as Node)
        dispatch(sourceSliceAction.clearSource())
    }
    return(
        <div className="canvas-wrapper">
            <div className="device" onDragOver={drag} onDrop={drop}></div>
        </div>
    )
}