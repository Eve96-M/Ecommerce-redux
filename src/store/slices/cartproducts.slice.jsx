import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../components/utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const cartProductsSlice = createSlice({
    name: 'cartProductsSlice',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            const product = action.payload
            return product
        }
    }
})

export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart', getConfig())
        .then((res) => dispatch(setCart(res.data.data.cart.products)))
        .finally(dispatch(setIsLoading(false)))

}

export const addCartThunk = (product) => (dispatch) => {
    dispatch(setIsLoading(true));
    axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', product, getConfig())
        .then((res) => dispatch(getCartThunk()))
        .finally(dispatch(setIsLoading(false)))

}

export const purchaseCart = () => (dispatch) => {
    dispatch(setIsLoading(true));
    axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', {}, getConfig())
        .then((res) => dispatch(setCart([])))
        .finally(dispatch(setIsLoading(false)))

}

export const { setCart } = cartProductsSlice.actions;

export default cartProductsSlice.reducer;
