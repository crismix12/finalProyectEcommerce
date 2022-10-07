import { createSlice } from '@reduxjs/toolkit';

export const filteredFromSearchSlice = createSlice({
    name: 'filteredFromSearch',
    initialState: {
        searchStatus: false,
        searchValue: ""
    },
    reducers: {
        setFilteredStatus: (state, action) => {
            return action.payload;
        }
    }
})

export const { setFilteredStatus } = filteredFromSearchSlice.actions;

export default filteredFromSearchSlice.reducer;
