import { Style } from "@/hooks/useParseCss";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

export interface routes {
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
    routes: Array<routes>
}

const initialState: State = {
    routes: [
        {
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
    reducers:{
        appendRoutes(state, payload) {
            state.routes.push(payload.payload)
        },
        updateVnode(state, payload) {
            state.routes.forEach((route: routes) => {
                if(route.name === payload.payload.name) {
                    route.vNode = payload.payload.vNode
                }
            })
        }
    }
})

export const routesSliceAction = routesSlice.actions

export const selectRoutes = (state: RootState) => state.routesElement