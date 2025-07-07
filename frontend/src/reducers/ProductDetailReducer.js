import {
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
 } from '../constants/ProductConstants'


const initialState = {
    loading: false,
    product: { reviews: []},
    error: ''
}

export const productDetailsReducer=(state = initialState,action) => {
switch(action.type) {
    case PRODUCT_DETAILS_REQUEST:
        return {
            ...state,
            loading: true}

    case PRODUCT_DETAILS_SUCCESS:
        return {
            loading: false ,
             product: action.payload,
             error:''
            }

    case PRODUCT_DETAILS_FAIL:
        return {
            loading: false ,
            product: {},
            error: action.payload
        }

    default: return state
}

}

export default productDetailsReducer
