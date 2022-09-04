import './index.scss'
import { DragEvent, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectSource, sourceSliceAction } from '@/store/source.slice'
import { useDispatch } from 'react-redux'
import { selectState, targetSliceAction } from '@/store/target.slice'
import { useCompile } from '@/hooks/useCompile'
import { routesSliceAction, selectCurRoutes, selectRoutes, selectVapp } from '@/store/routes.slice'
import { selectTarget } from '@/store/target.slice'
import { selectDevice } from '@/store/device.slice'
import { useRenderer } from '@/hooks/useRenderer'
import { Vapp, vNode } from '@/store/ast'
export const Canvas = () => {
    const dispatch = useDispatch()
    const current = useSelector(selectCurRoutes)
    const source = useSelector(selectSource)
    const device = useSelector(selectDevice)
    const target = useSelector(selectTarget)
    const state = useSelector(selectState)
    const Vapp = useSelector(selectVapp)
    const root = useRef<any>(null)
    // clone the HTMLElement
    const newSource = source?.cloneNode(true) as HTMLElement
    // record the number of element in canvas
    const [num, setNum] = useState<number>(0)
    const drag = (e: DragEvent) => {
        e.preventDefault()
    }
    // initial root dom at the first time of render
    useEffect(() => {
        dispatch(sourceSliceAction.initialRoot(root.current))
        const data = JSON.parse(localStorage.getItem('vapp') as string) as Vapp
        if (data !== null) {
            dispatch(routesSliceAction.retriveDom())
            const index = data.routes[0].vnode
            useRenderer(root.current, index as vNode, dispatch)
        }
        const len = root?.current.childNodes.length as number
        const childs = root?.current.childNodes

        return (() => {
            // clear main display
            for (let i = len - 1; i >= 0; i--) {
                // @ts-ignore
                root?.current.removeChild(childs[i])
            }
        })
    }, [])

    const drop = (e: DragEvent) => {
        createDom(e)
        // update route vNode to redux
        const curVnode = {
            id: current.id,
            vNode: useCompile(root.current, device.width, false)
        }
        dispatch(routesSliceAction.updateVnode(curVnode))
    }
    const createDom = (e: DragEvent) => {
        const target = e.target as HTMLElement
        newSource.draggable = false
        newSource.addEventListener('click', (e: MouseEvent) => {
            dispatch(targetSliceAction.captureTarget(e.target))
            dispatch(targetSliceAction.updateState(true))
        })
        newSource.classList.add(newSource.nodeName + num)
        setNum(num + 1)
        target.appendChild(newSource as Node)
        dispatch(sourceSliceAction.clearSource())
    }
    // delete element
    document.onkeydown = (e: KeyboardEvent) => {
        if (e.key === 'Backspace' && state) {
            target?.remove()
            const curVnode = {
                id: current.id,
                vNode: useCompile(root.current, device.width, false)
            }
            dispatch(routesSliceAction.updateVnode(curVnode))
        }
    }

    return (
        <div className="canvas-wrapper">
            <div className="device" ref={root} onDragOver={drag} onDrop={drop}></div>
        </div>
    )
}