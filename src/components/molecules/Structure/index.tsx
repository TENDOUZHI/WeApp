import { routesSliceAction, selectRoutes } from '@/store/routes.slice'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import './index.scss'
export const Structure = () => {
    const dispatch = useDispatch()
    const route = useSelector(selectRoutes)
    const routeDom = useRef<Array<any>>([])
    const createPage = () => {
        const name = 'logs'
        dispatch(routesSliceAction.appendRoutes(name))
    }
    const changeRoute = (name: string, id: number) => {
        dispatch(routesSliceAction.changeRoutes(name))
        routeDom.current.forEach((dom: HTMLElement, index: number) => {
            if (index !== id) {
                dom.classList.remove('selected')
            } else {
                dom.classList.add('selected')
            }
        })

    }
    return (
        <div className='page-structure'>
            <div className='page-structure-create' onClick={createPage}>create page + </div>
            <ul className='page-structure-wrapper'>
                {route.map(item => <li className="page-structure-wrapper-item"
                    ref={dom => routeDom.current[item.id] = dom}
                    onClick={() => changeRoute(item.name, item.id)}
                    key={item.id}
                >{item.name}</li>)}
            </ul>
        </div>
    )
}