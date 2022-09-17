import { createSlice, current } from "@reduxjs/toolkit";
import { RootState } from ".";
import { routes, Vapp, vNode } from "./ast";



interface State {
    current: {
        id: number,
        name: string
    },
    maxSize: number,
    Vapp: Vapp,
    Wapp: Vapp
}

const initialState: State = {
    current: {
        id: 0,
        name: 'index'
    },
    maxSize: 0,
    Vapp: {
        project_name: '',
        routes: [
            {
                id: 0,
                name: 'index',
                vnode: {
                    name: 'root',
                    class: '',
                    tag_name: 'div',
                    style: null,
                    content: null,
                    children: []
                }
            }
        ]
    },
    Wapp: {
        project_name: '',
        routes: [
            {
                id: 0,
                name: 'index',
                vnode: {
                    name: 'root',
                    class: '',
                    tag_name: 'div',
                    style: null,
                    content: null,
                    children: []
                }
            }
        ]
    },
}

export const routesSlice = createSlice({
    name: 'routesSlice',
    initialState,
    reducers: {
        appendRoutes(state, payload) {
            const vNode: vNode = {
                name: 'root',
                class: '',
                tag_name: 'div',
                style: null,
                content: null,
                children: []
            }
            state.maxSize += 1
            const route: routes = {
                id: state.maxSize,
                name: payload.payload,
                vnode: vNode
            }
            state.Vapp.routes.push(route)
            state.Wapp.routes.push(route)
            localStorage.setItem('size', JSON.stringify(state.maxSize))
            localStorage.setItem('vapp', JSON.stringify(state.Vapp))
            localStorage.setItem('wapp', JSON.stringify(state.Wapp))
        },
        deleteRoute(state, payload) {
            // state.Vapp.routes.splice(payload.payload,1)
            state.Vapp.routes[payload.payload].name = 'deleted'
            localStorage.setItem('size', JSON.stringify(state.maxSize))
            localStorage.setItem('vapp', JSON.stringify(state.Vapp))
            localStorage.setItem('wapp', JSON.stringify(state.Wapp))
        },
        updateVnode(state, payload) {
            state.Vapp.routes.forEach((route: routes) => {
                if (route.id === payload.payload.curVnode.id) {
                    route.vnode = payload.payload.curVnode.vNode
                }
            })
            state.Wapp.routes.forEach((route: routes) => {
                if (route.id === payload.payload.curWnode.id) {
                    route.vnode = payload.payload.curWnode.vNode
                }
            })
            localStorage.setItem('size', JSON.stringify(state.maxSize))
            localStorage.setItem('vapp', JSON.stringify(state.Vapp))
            localStorage.setItem('wapp', JSON.stringify(state.Wapp))
        },
        changeRoutes(state, payload) {
            state.current = payload.payload
        },
        retriveDom(state) {
            const Vjson = localStorage.getItem('vapp')
            const Wjson = localStorage.getItem('wapp')
            state.Vapp = JSON.parse(Vjson as string)
            state.Wapp = JSON.parse(Wjson as string)
        },
        retriveSize(state) {
            const size = localStorage.getItem('size')
            state.maxSize = JSON.parse(size as string)
        },
        updateProjectName(state, payload) {
            state.Vapp.project_name = payload.payload
            state.Wapp.project_name = payload.payload
            localStorage.setItem('size', JSON.stringify(state.maxSize))
            localStorage.setItem('vapp', JSON.stringify(state.Vapp))
            localStorage.setItem('wapp', JSON.stringify(state.Wapp))
        }
    }
})

export const routesSliceAction = routesSlice.actions

export const selectRoutes = (state: RootState) => state.routesElement.Vapp.routes
export const selectCurRoutes = (state: RootState) => state.routesElement.current
export const selectVapp = (state: RootState) => state.routesElement.Vapp
export const selectWapp = (state: RootState) => state.routesElement.Wapp
export const selectRouteSize = (state: RootState) => state.routesElement.maxSize