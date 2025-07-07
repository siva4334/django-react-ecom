import { combineReducers } from 'redux'
import {
    productListReducers,
    productDeleteReducer,
    productCreateReducer ,
    productUpdateReducer,
    productReviewCreateReducer,
    producTopReducer,
} from './reducers/ProductReducers'
import { productDetailsReducer } from './reducers/ProductDetailReducer'
import { cartReducer } from './reducers/CartReducer'
import { userLoginReducer , userRegisterReducer , userDetailsReducer , userUpdateProfileReducer , userListReducer , userDeleteReducer , userUpdateReducer  } from './reducers/User_Reducers'
import { orderCreateReducer , orderDetailsReducer , orderPayReducer, orderListMyReducer , orderListReducer, orderDeliverReducer} from './reducers/OrderReducer'

const rootReducer = combineReducers (
    {
    product: productListReducers,
    productdetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate:productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTop:producTopReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile : userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate : orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,

}
 )

export default rootReducer
