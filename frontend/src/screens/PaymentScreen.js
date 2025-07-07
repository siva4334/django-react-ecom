import React , {useState, useEffect} from 'react'
import { useLocation , useNavigate} from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/CartActions'
import {BrowserRouter as Router , Route ,Routes} from 'react-router-dom'


function PaymentScreen() {

  const cart = useSelector(state => state.cart)
  const {shippingAddress } = cart

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [ paymentMethod,setPaymentMethod ] = useState('Paypal')

  if(!shippingAddress.address) {
        navigate('/shipping')
  }

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')

  }

  return (
    <FormContainer>

      <CheckoutSteps step1 step2 step3 />
      <Form onSubmit={submitHandler}>
      <Form.Group>
        <Form.Label as='legend'>Select Payment Method     </Form.Label>
        <Col>
        <Form.Check
        type ="radio"
        label="Paypal or Credit Card"
        id="paypal"
        name="paymentMethod"
        checked
        onChange={(e) => setPaymentMethod(e.target.value)}
        >
          </Form.Check>


        </Col>

      </Form.Group>
        <br></br>
        <Button type='submit' variant='info'>
          Continue
        </Button>
      </Form>

    </FormContainer>
  )
}

export default PaymentScreen
