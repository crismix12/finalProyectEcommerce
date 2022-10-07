import { configureStore } from '@reduxjs/toolkit'
import cartProductsSlice from './slices/cartProducts.slice'
import filteredFromSearchSlice from './slices/isFilteredFromSearch.slice'
import isLoadingSlice from './slices/isLoading.slice'
import productsSlice from './slices/products.slice'
import productsFilteredSlice from './slices/productsFiltered.slice'
import purchasesSlice from './slices/purchases.slice'

export default configureStore({
    reducer: {
        isLoading: isLoadingSlice,
        products: productsSlice,
        filteredProducts: productsFilteredSlice,
        purchases: purchasesSlice,
        cartProducts: cartProductsSlice,
        filteredFromSearchStatus: filteredFromSearchSlice 
    }
})
