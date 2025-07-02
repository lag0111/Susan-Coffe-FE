import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: "filter",
    initialState: { min: 0, max: 99999999999 },
    reducers: {
        setMin: (state, actions) => {
            state.min = Number(actions.payload)
            return state
        },
        setMax: (state, actions) => {
            state.max = Number(actions.payload)
            return state
        },
    }
})

export const { setMin, setMax } = filterSlice.actions;
export default filterSlice.reducer;