import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    sort: null
}



const sortSlice = createSlice({
    name: "sortProduct",
    initialState,
    reducers: {
        sortASC: (state)=>(state = "ASC"),
        sortDESC: (state)=>(state = "DESC"),
        sortDefault: (state)=>(state = null),
    }
})

export const { sortASC,sortDESC,sortDefault} = sortSlice.actions;
export default sortSlice.reducer;