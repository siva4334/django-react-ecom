import React , {useState, useEffect} from 'react'
import { useLocation , useNavigate, useParams} from 'react-router-dom'
import {  Button , Row , Col , ListGroup , Image , Card} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import { PayPalButton} from 'react-paypal-button-v2'
import { PayPalButtons , PayPalScriptProvider } from "@paypal/react-paypal-js";
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link} from 'react-router-dom'
import { getOrderDetails , payOrder , deliverOrder } from '../actions/OrderActions'
import { ORDER_PAY_RESET , ORDER_DELIVER_RESET} from '../constants/OrderConstants'

function OrderScreen({match}) {

// const orderId = match.params.id
const { orderId } = useParams()

const dispatch = useDispatch()

const orderDetails = useSelector(state => state.orderDetails)
const {order , error , loading} = orderDetails

const orderDeliver = useSelector(state => state.orderDeliver)
const {loading:loadingDeliver , success:successDeliver} = orderDeliver

const orderPay = useSelector(state => state.orderPay)
const {loading:loadingPay , success:successPay} = orderPay

const userLogin = useSelector(state => state.userLogin)
const { userInfo} = userLogin

const [sdkReady, setSdkReady] = useState(false)

const navigate = useNavigate()

if(!loading && !error){
order.itemsPrice = order.orderItems.reduce((acc,item) => acc+item.price * item.qty, 0).toFixed(2)
}

//ATsGzrWY5y-LiroXKzG3REM415Eo0CpV9vof76heOHP-SuDFjG1Aq1JMGbqHyt3e6euKp1BStaZsOMN1
//EFjwOVvn2BOTTJUsycNqho3KQ7LTJ1QoAnyJpyXYkN2jV4ZzSzFa0NFiOiCgxg3A5fATI4SE1gs09y7b

// const addPaypalScript = () => {
//     const script =document.createElement('script')
//     script.type='text/javascript'
//     // script.src='https://www.paypal.com/sdk/js?client-id=ATsGzrWY5y-LiroXKzG3REM415Eo0CpV9vof76heOHP-SuDFjG1Aq1JMGbqHyt3e6euKp1BStaZsOMN1'
//     script.async = true
//     script.onload = () => {
//         setSdkReady(true)
//     }
//     document.body.appendChild(script)
// }

useEffect(()  => {

    if(!userInfo){
        navigate('/login')
    }

    if (!order || successPay || order._id !== Number(orderId) || successDeliver) {
    dispatch({type: ORDER_PAY_RESET})
    dispatch({type: ORDER_DELIVER_RESET})
    dispatch(getOrderDetails(orderId))
    }
    // else if(!order.isPaid) {
    //     if(!window.paypal){
    //         addPaypalScript()
    //     }else{
    //         setSdkReady(true)
    //     }
    // }
},[dispatch,order,orderId , successPay , successDeliver])


const successPaymentHanlder= (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
}


const deliverHandler = () => {
    dispatch(deliverOrder(order))
}


  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'> {error} </Message>
  ) :
  (
    <div>
        <h1> Order: {order._id}</h1>
        <Row>
            <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2> Shipping </h2>

                    <p><strong>Name: </strong>
                    {order.user.name}
                    </p>
                    <p><strong>Email: </strong>
                    <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                    </p>

                    <p>
                        <strong>Shipping: </strong>
                        {order.shippingAddress.address} , {order.shippingAddress.city}
                        {' '}
                        {order.shippingAddress.postalCode}
                        {' '}
                        {order.shippingAddress.country}
                    </p>

                    {order.isDelivered ? (
                        <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                    ): (
                        <Message variant='warning'>Not Delivered</Message>
                    )
                }

                </ListGroup.Item>

                <ListGroup.Item>
                    <h2> Payment Method </h2>
                    <p>
                        <strong>Method: </strong>
                        {order.paymentMethod}
                    </p>

                    {order.isPaid ? (
                        <Message variant='success'>Paid on {order.paidAt}</Message>
                    ): (
                        <Message variant='warning'>Not Paid</Message>
                    )
                }

                </ListGroup.Item>

                <ListGroup.Item>
                    <h2> Order Items </h2>

                    {order.orderItems.length === 0 ? <Message variant='info'>
                        Your Order is Empty
                    </Message> : (
                        <ListGroup variant='flush'>
                            {order.orderItems.map((item,index) => (
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
                    <h2> Order Summary</h2>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Item:</Col>
                            <Col>${order.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping:</Col>
                            <Col>${order.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>


                      <ListGroup.Item>
                        <Row>
                            <Col>Tax:</Col>
                            <Col>${order.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                            <Col>Total:</Col>
                            <Col>${order.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                     {!order.isPaid && (
                        <ListGroup.Item>
                            {loadingPay && <Loader />}

        <PayPalScriptProvider options={{ clientId: "ATsGzrWY5y-LiroXKzG3REM415Eo0CpV9vof76heOHP-SuDFjG1Aq1JMGbqHyt3e6euKp1BStaZsOMN1", components: "buttons" }}>
                                            <PayPalButtons
                                    amount={order.totalPrice}
                                    onSuccess={successPaymentHanlder}
                                />
        </PayPalScriptProvider>

                        </ListGroup.Item>
                     )}




                </ListGroup>

                {loadingDeliver && <Loader />}
                { userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',paddingTop: '10px',paddingBottom: '10px', }}>
                    <ListGroup.Item>
                        <Button
                         type='button'
                         className='btn btn-info'
                         onClick={deliverHandler}
                        >
                            Mark As Deliver
                        </Button>
                    </ListGroup.Item>
                    </div>
                )}

            </Card>
            </Col>
        </Row>

    </div>
  )
}



export default OrderScreen
