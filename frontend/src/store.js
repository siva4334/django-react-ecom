import { createStore,applyMiddleware } from 'redux'
import rootReducer from './rootReducer'
import { thunk } from 'redux-thunk'
import { composeWithDevTools  } from '@redux-devtools/extension'
import { logger } from 'redux-logger'

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
                            JSON.parse(localStorage.getItem('cartItems')): []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
                            JSON.parse(localStorage.getItem('userInfo')): null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
                            JSON.parse(localStorage.getItem('shippingAddress')): {}

const initialState = {
    cart: {
        cartItems : cartItemsFromStorage,
        shippingAddress : shippingAddressFromStorage,
    },
    userLogin: {userInfo: userInfoFromStorage}
}

const store = createStore(rootReducer,initialState,composeWithDevTools(applyMiddleware(logger,thunk))
)

export default store
