import React , {useState, useEffect} from 'react'
import { useLocation , useNavigate} from 'react-router-dom'
import {  Button , Row , Col , ListGroup , Image , Card} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import { Link} from 'react-router-dom'
import { createOrder } from '../actions/OrderActions'
import { ORDER_CREATE_RESET } from '../constants/OrderConstants'

function PlaceOrderScreen() {


const orderCreate = useSelector(state => state.orderCreate)
const {order , error , success} = orderCreate

const dispatch = useDispatch()
const cart = useSelector(state => state.cart)

const navigate = useNavigate()

cart.itemsPrice = cart.cartItems.reduce((acc,item) => acc+item.price * item.qty, 0).toFixed(2)
cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2)

cart.taxPrice = ((0.082) * cart.itemsPrice).toFixed(2)

cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

if(!cart.paymentMethod) {
    navigate('/payment')
}

useEffect(()  => {
    if(success){
       navigate(`/order/${order._id}`)
       dispatch({type: ORDER_CREATE_RESET})
    }
},[success])

const placeOrder = () => {
    dispatch(createOrder({
        orderItems:cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod:cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice:cart.shippingPrice,
        taxPrice:cart.taxPrice,
        totalPrice:cart.totalPrice,
    }

    ))
}

  return (
    <div>
        <CheckoutSteps step1 step2 step3 step4 />

        <Row>
            <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2> Shipping </h2>
                    <p>
                        <strong>Shipping: </strong>
                        {cart.shippingAddress.address} , {cart.shippingAddress.city}
                        {' '}
                        {cart.shippingAddress.postalCode}
                        {' '}
                        {cart.shippingAddress.country}
                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2> Payment Method </h2>
                    <p>
                        <strong>Method: </strong>
                        {cart.paymentMethod}
                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2> Order Items </h2>

                    {cart.cartItems.length === 0 ? <Message variant='info'>
                        Your Cart is Empty
                    </Message> : (
                        <ListGroup variant='flush'>
                            {cart.cartItems.map((item,index) => (
                                <ListGroup.Item key= {index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src = {item.image} alt = {item.name} fluid rounded/>
                                        </Col>

                                        <Col>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>

                                        <Col md={4}>
                                        {item.qty} x $ {item.price} = ${(item.qty * item.price).toFixed(2)}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ) )}
                        </ListGroup>

                    )}

                </ListGroup.Item>


            </ListGroup>
            </Col>

            <Col md = {4}>

            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                    <h2> Price Summary</h2>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Item:</Col>
                            <Col>${cart.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping:</Col>
                            <Col>${cart.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>


                      <ListGroup.Item>
                        <Row>
                            <Col>Tax:</Col>
                            <Col>${cart.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                            <Col>Total:</Col>
                            <Col>${cart.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        { error &&  <Message variant='danger'> {error}</Message>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button
                        type='button'
                        className='btn-info'
                        disabled={cart.cartItems.length === 0}
                        onClick={placeOrder}
                        >
                            Place Order
                        </Button>
                    </ListGroup.Item>



                </ListGroup>
            </Card>
            </Col>
        </Row>

    </div>
  )
}

export default PlaceOrderScreen
