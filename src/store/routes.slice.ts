import { Style } from "@/hooks/useParseCss";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

export interface Vapp {
    project_name: string,
    routes: Array<routes>
}

export interface routes {
    id: number,
    name: string,
    vNode: vNode | null
}

export interface vNode {
    name: string,
    style: Style | object | null,
    content: string | null,
    children: Array<vNode>
}

interface State {
    current: string,
    routes: Array<routes>
}

const initialState: State = {
    current: '',
    routes: [
        {
            id: 0,
            name: 'index',
            vNode: {
                name: 'root',
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
                style: null,
                content: null,
                children: []
            }
            const route: routes = {
                id: state.routes.length,
                name: payload.payload,
                vNode: vNode
            }
            
            state.routes.push(route)
        },
        updateVnode(state, payload) {
            state.routes.forEach((route: routes) => {
                if (route.id === payload.payload.id) {
                    route.vNode = payload.payload.vNode
                }
            })
        },
        changeRoutes(state, payload) {
            state.current = payload.payload
        }
    }
})

export const routesSliceAction = routesSlice.actions

export const selectRoutes = (state: RootState) => state.routesElement.routes
export const selectCurRoutes = (state: RootState) => state.routesElement.current