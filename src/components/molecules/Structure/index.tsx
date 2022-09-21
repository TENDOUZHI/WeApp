import { useCompile } from '@/hooks/useCompile'
import { useRenderer } from '@/hooks/useRenderer'
import { vNode } from '@/store/ast'
import { selectDevice } from '@/store/device.slice'
import { routesSliceAction, selectCurRoutes, selectRoutes, selectRouteSize } from '@/store/vapp.slice'
import { selectRoot } from '@/store/source.slice'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import arrow from '@/assets/arrow.png'
import './index.scss'
import { targetSliceAction } from '@/store/target.slice'
import { RoutePage } from '@/components/atoms/RoutePage'
export const Structure = () => {
    const dispatch = useDispatch()
    const route = useSelector(selectRoutes)
    const root = useSelector(selectRoot)
    const device = useSelector(selectDevice)
    const current = useSelector(selectCurRoutes)
    const routeDom = useRef<Array<any>>([])
    const optionUl = useRef<Array<any>>([])
    const arrowRef = useRef<Array<any>>([])
    const input = useRef<Array<any>>([])
    const bar = useRef<Array<any>>([])
    const layer = useRef<any>()
    useEffect(() => {
        dispatch(routesSliceAction.retriveSize())
    }, [])
    const createPage = () => {
        const name = 'new route'
        dispatch(routesSliceAction.appendRoutes(name))
    }
    const changeRoute = (name: string, id: number): void => {
        // update vNode before switch route
        updateVNode()
        // change leftlist item style
        changeStyle(name, id)
        // switch route
        switchRoute(name, id)

    }
    const updateVNode = () => {
        const curVnode = {
            id: current.id,
            vNode: useCompile(root, device.width, false)
        }
        const curWnode = {
            id: current.id,
            vNode: useCompile(root, device.width, true)
        }
        dispatch(routesSliceAction.updateVnode({ curVnode, curWnode }))
    }
    const changeStyle = (name: string, id: number) => {
        dispatch(routesSliceAction.changeRoutes({ name, id }))
        routeDom.current.forEach((dom: HTMLElement, index: number) => {
            if (index !== id && dom) {
                try {
                    dom.classList.remove('selected')
                } catch (error) { }
            } else {
                try {
                    dom.classList.add('selected')
                } catch (error) { }

            }
        })
    }
    const switchRoute = (name: string, id: number) => {
        const len = root?.childNodes.length as number
        const childs = root?.childNodes
        // judge whether user click cur route
        // if is nothing changed
        if (id !== current.id) {
            // clear main display
            for (let i = len - 1; i >= 0; i--) {
                // @ts-ignore
                root?.removeChild(childs[i])
            }
            // render dom
            useRenderer(root as HTMLElement, route[id].vnode as vNode, dispatch)
        }
    }
    
    return (
        <div className='page-structure'>
            <div className="page-structure-layer none" ref={layer}></div>
            <div className='page-structure-create' onClick={createPage}>create page + </div>
            <ul className='page-structure-wrapper'>
                {route.map(item =>
                    item.name !== 'deleted' &&
                    <RoutePage key={item.id} value={item.name} id={item.id} changeRoute={changeRoute}/>
                )}
                
            </ul>
        </div>
    )
}