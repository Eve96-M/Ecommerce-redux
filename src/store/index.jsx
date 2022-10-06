import { configureStore } from '@reduxjs/toolkit'
import  cartProductsSlice  from './slices/cartproducts.slice'
import  isLoadingSlice  from './slices/isLoading.slice'
import productSlice from './slices/product.slice'
import purchasesSlice from './slices/purchases.slice'

export default configureStore({
    reducer: {
        isLoading:isLoadingSlice,
        product:productSlice,
        purchases:purchasesSlice,
        cart:cartProductsSlice
    }
})
