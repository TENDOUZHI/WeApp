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
    const deletePage = (id: number) => {
        dispatch(routesSliceAction.deleteRoute(id))
    }
    const changeRoute = (name: string, id: number) => {
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
    // display options
    const [show, setShow] = useState<boolean>(false)
    const switchOption = (id: number) => {
        if (!show) {
            optionUl.current[id].classList.remove('none')
            optionUl.current[id].classList.add('block')
            arrowRef.current[id].classList.add('rotate')
            setTimeout(() => {
                optionUl.current[id].classList.add('show-ul')
            })
            dispatch(targetSliceAction.stateLayer(!show))
            setShow(true)
        } else {
            optionUl.current[id].classList.add('none')
            optionUl.current[id].classList.remove('block')
            optionUl.current[id].classList.remove('show-ul')
            arrowRef.current[id].classList.remove('rotate')
            dispatch(targetSliceAction.stateLayer(!show))
            setShow(false)
        }
    }
    // rename
    const updateValue = (e: { target: { value: any } }, id: number) => {
        dispatch(routesSliceAction.updateRouteName({
            id: id,
            name: e.target.value
        }))
    }
    const inputChangeAble = (id: number) => {
        input.current[id].readOnly = false
        bar.current[id].style.width = '100%'
    }
    const focusInput = (id: number) => {
    }
    const blurInput = (id: number) => {
        input.current[id].readOnly = true
        bar.current[id].style.width = '0%'
    }
    return (
        <div className='page-structure'>
            <div className="page-structure-layer none" ref={layer}></div>
            <div className='page-structure-create' onClick={createPage}>create page + </div>
            <ul className='page-structure-wrapper'>
                {route.map(item =>
                    item.name !== 'deleted' &&
                    <li className="page-structure-wrapper-item"
                        ref={dom => routeDom.current[item.id] = dom}
                        onClick={() => changeRoute(item.name, item.id)}
                        key={item.id}
                    >
                        {/* {item.name} */}
                        <div className='page-input-wrapper'>
                            <input
                                className='page-structure-wrapper-item-input'
                                type="text"
                                value={item.name}
                                readOnly
                                onChange={(e) => updateValue(e, item.id)}
                                onFocus={() => focusInput(item.id)}
                                onBlur={() => blurInput(item.id)}
                                ref={dom => input.current[item.id] = dom}
                            />
                            <div className="input-bar"ref={dom => bar.current[item.id] = dom}></div>
                        </div>
                        <div className='page-structure-wrapper-item-options' onClick={() => switchOption(item.id)}>
                            <img className='page-structure-wrapper-item-options-img' ref={dom => arrowRef.current[item.id] = dom}
                                src={arrow} alt="" />
                        </div>
                        <ul className='page-structure-item-ul none' ref={dom => { optionUl.current[item.id] = dom }}>
                            <li className='page-structure-item-ul-li' onClick={() => { switchOption(item.id), deletePage(item.id) }}>delete</li>
                            <li className='page-structure-item-ul-li' onClick={() => { switchOption(item.id), inputChangeAble(item.id) }}>rename</li>
                        </ul>
                    </li>
                )}
            </ul>
        </div>
    )
}