import './index.scss'
import { DragEvent, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectSource, sourceSliceAction } from '@/store/source.slice'
import { useDispatch } from 'react-redux'
import { selectState, targetSliceAction } from '@/store/target.slice'
import { useCompile } from '@/hooks/useCompile'
import { routesSliceAction, selectCurRoutes, selectRoutes, selectVapp } from '@/store/vapp.slice'
import { selectTarget } from '@/store/target.slice'
import { selectDevice } from '@/store/device.slice'
import { useRenderer } from '@/hooks/useRenderer'
import { Vapp, VNode } from '@/store/ast'
import axios from 'axios'
import { selectUser } from '@/store/user.slice'
import { selectWs } from '@/store/ws.slice'
interface Props {
    program_id: number,
    programData: string
}
export const Canvas = (props: Props) => {
    const dispatch = useDispatch()
    const current = useSelector(selectCurRoutes)
    const source = useSelector(selectSource)
    const device = useSelector(selectDevice)
    const target = useSelector(selectTarget)
    const state = useSelector(selectState)
    const Vapp = useSelector(selectVapp)
    const user = useSelector(selectUser)
    const ws = useSelector(selectWs)
    const root = useRef<any>(null)
    // const firstUpdate = useRef<boolean>(true);
    const [fitst, setFitst] = useState<boolean>(true)
    // clone the HTMLElement
    const newSource = source?.cloneNode(true) as HTMLElement
    // record the number of element in canvas
    const [num, setNum] = useState<number>(0)
    const drag = (e: DragEvent) => {
        e.preventDefault()
    }
    const selectData = useCallback(async (id: number) => {
        const payload = {
            id
        }
        await axios.post('/programlist/data', payload).then(res => {
            if (res.status === 200) {
                dispatch(sourceSliceAction.initialRoot(root.current))
                if (res.data) {
                    const vapp = JSON.parse(res.data.data)
                    if (vapp !== null) {
                        localStorage.setItem('vapp', JSON.stringify(vapp))
                        // localStorage.setItem('wapp', JSON.stringify(vapp))
                        dispatch(routesSliceAction.retriveDom())
                        const index = vapp.routes[0].vnode
                        setNum(vapp.routes[current.id].size)
                        useRenderer(root.current, index as VNode, dispatch)
                    }
                }
            }
        })
        // if user not login
        // free try use
        // if (user.isLogin === false) {
        //     const data = JSON.parse(localStorage.getItem('vapp') as string) as Vapp
        //     if (data !== null) {
        //         dispatch(routesSliceAction.retriveDom())
        //         const index = data.routes[0].vnode
        //         // console.log(data.routes[current.id].size);
        //         setNum(data.routes[current.id].size)
        //         useRenderer(root.current, index as vNode, dispatch)
        //     }
        // }
    }, [props.program_id])
    // initial root dom at the first time of render
    useLayoutEffect(() => {
        if (fitst) {
            setFitst(false);
            return;
        } else {
            selectData(props.program_id)
        }
        const len = root?.current.childNodes.length as number
        const childs = root?.current.childNodes

        return (() => {
            // clear main display
            for (let i = len - 1; i >= 0; i--) {
                // @ts-ignore
                try {
                    root?.current.removeChild(childs[i])
                } catch (error) { }

            }
        })
    }, [props])

    const drop = (e: DragEvent) => {
        createDom(e)
        // update route vNode to redux
        const curVnode = {
            id: current.id,
            vNode: useCompile(root.current, device.width, false)
        }
        const curWnode = {
            id: current.id,
            vNode: useCompile(root.current, device.width, true)
        }
        dispatch(routesSliceAction.updateVnode({
            curVnode, curWnode,
            user_id: user.id,
            program_id: props.program_id,
            ws: ws
        }))
    }
    const createDom = (e: DragEvent) => {
        const target = e.target as HTMLElement
        newSource.draggable = false
        newSource.classList.add(newSource.nodeName + num)
        setNum(num + 1)
        dispatch(routesSliceAction.updateRouteSize({
            id: current.id, size: num + 1,
            // user_id: user.id,
            // program_id: props.program_id,
            // ws: ws 
        }))
        target.appendChild(newSource as Node)
        const cacheBorder = getComputedStyle(newSource).border
        // heighlight element 
        newSource.addEventListener('click', (e: MouseEvent) => {
            dispatch(targetSliceAction.captureTarget(e.target))
            dispatch(targetSliceAction.updateState(true))
            // newSource.style.border = 'solid 4px #6188de'
        })
        // document.addEventListener('click',(e: MouseEvent) => {
        //     if(e.target !== newSource) {
        //         newSource.style.border = cacheBorder
        //     }
        // })
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
            const curWnode = {
                id: current.id,
                vNode: useCompile(root.current, device.width, true)
            }
            dispatch(routesSliceAction.updateVnode({
                curVnode, curWnode,
                user_id: user.id,
                program_id: props.program_id,
                ws: ws
            }))
        }
    }
    const saveData = async () => {
        const payload = {
            id: props.program_id,
            user_id: user.id,
            data: JSON.stringify(Vapp),
            program_name: Vapp.project_name,
            lastdate: new Date().toLocaleDateString().replaceAll('/', '-')
        }
        // console.log(payload);
        await axios.post('/programlist/save', payload).then(res => {
            // console.log(res);
        })
    }

    return (
        <div className="canvas-wrapper">
            <div className="device" ref={root} onDragOver={drag} onDrop={drop}></div>
            {/* <button className='btn' onClick={saveData}>save</button> */}
        </div>
    )
}