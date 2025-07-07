import { Container } from 'react-bootstrap'
import { Provider } from 'react-redux'
import {BrowserRouter as Router , Route ,Routes} from 'react-router-dom'
import store from './store'

import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'

function App() {
  return (
    <Router>
    <Provider store={store}>
      <Header />
      <main className='py-2'>
        <Container>
          <Routes>
          <Route path='/home' Component={HomeScreen} exact />
          <Route path='/login' Component={LoginScreen} exact />
          <Route path='/register' Component={RegisterScreen} exact />
          <Route path='/profile' Component={ProfileScreen} exact />
          <Route path='/shipping' Component={ShippingScreen} exact />
          <Route path='/payment' Component={PaymentScreen} exact />
          <Route path='/placeorder' Component={PlaceOrderScreen} exact />
          <Route path='/order/:orderId' Component={OrderScreen} exact />
          <Route path='/' Component={HomeScreen} exact />
          <Route path='/product/:id' Component={ProductScreen}  />
          <Route path='/cart/:id?' Component={CartScreen}  />
          <Route path='/admin/userlist' Component={UserListScreen}  />
          <Route path='/admin/user/:id/edit' Component={UserEditScreen}  />
          <Route path='/admin/productlist' Component={ProductListScreen}  />
          <Route path='/admin/product/:id/edit' Component={ProductEditScreen}  />
          <Route path='/admin/orderlist' Component={OrderListScreen}  />
          </Routes>
        </Container>
      </main>
      <Footer />
      </Provider>
    </Router>
  );
}

export default App;
