import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface State {
    target: HTMLElement | null,
    delete: boolean
}

const initialState: State = {
    target: null,
    delete: true
}

export const targetSlice = createSlice({
    name: 'targetSlice',
    initialState,
    reducers: {
        captureTarget(state, payload) {
            state.target = payload.payload
        },
        updateState(state, payload) {
            state.delete = payload.payload
        }
    }
})

export const targetSliceAction = targetSlice.actions

export const selectTarget = (state: RootState) => state.targetElement.target
export const selectState = (state: RootState) => state.targetElement.delete