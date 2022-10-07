import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

export const productsFilteredSlice = createSlice({
    name: 'filteredProducts',
    initialState: [],
    reducers: {
        getFilteredProducts: (state, action) =>{
            // state = useSelector(state=> state.products)
            return action.payload
            // return state
        }

    }
})

export const { getFilteredProducts } = productsFilteredSlice.actions;

export default productsFilteredSlice.reducer;
