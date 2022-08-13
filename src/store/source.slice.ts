import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface State {
    source: HTMLElement | null
}

const initialState: State = {
    source: null
}

export const sourceSlice = createSlice({
    name: 'sourceSlice',
    initialState,
    reducers: {
        captureSource(state, payload) {
            state.source = payload.payload
        },
        clearSource(state) {
            state.source = null
        }
    }
})

export const sourceSliceAction = sourceSlice.actions

export const selectSource = (state: RootState) => state.sourceElement.source