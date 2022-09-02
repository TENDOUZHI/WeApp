import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { routes, Vapp,vNode } from "./ast";



interface State {
    current: {
        id: number,
        name: string
    },
    routes: Array<routes>,
    Vapp: Vapp
}

const initialState: State = {
    current: {
        id: 0,
        name: 'index'
    },
    Vapp: {
        project_name:'Title',
        routes: [
            {
                id: 0,
                name: 'index',
                vNode: {
                    name: 'root',
                    class:'',
                    tagName:'div',
                    style: null,
                    content: null,
                    children: []
                }
            }
        ]
    },
    routes: [
        {
            id: 0,
            name: 'index',
            vNode: {
                name: 'root',
                class:'',
                tagName:'div',
                style: null,
                content: null,
                children: []
            }
        }
    ]
}

export const routesSlice = createSlice({
    name: 'routesSlice',
    initialState,
    reducers: {
        appendRoutes(state, payload) {
            const vNode: vNode = {
                name: 'root',
                class:'',
                tagName:'div',
                style: null,
                content: null,
                children: []
            }
            const route: routes = {
                id: state.Vapp.routes.length,
                name: payload.payload,
                vNode: vNode
            }
            state.Vapp.routes.push(route)
        },
        updateVnode(state, payload) {
            state.Vapp.routes.forEach((route: routes) => {
                if (route.id === payload.payload.id) {
                    route.vNode = payload.payload.vNode
                }
            })
            localStorage.setItem('vapp', JSON.stringify(state.Vapp))
        },
        changeRoutes(state, payload) {
            state.current = payload.payload
        },
        retriveDom(state) {
            const json = localStorage.getItem('vapp')
            state.Vapp = JSON.parse(json as string)
        }
    }
})

export const routesSliceAction = routesSlice.actions

export const selectRoutes = (state: RootState) => state.routesElement.Vapp.routes
export const selectCurRoutes = (state: RootState) => state.routesElement.current
export const selectVapp = (state: RootState) => state.routesElement.Vapp