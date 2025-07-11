import React , {useState, useEffect} from 'react'
import { useLocation , useNavigate} from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/CartActions'
import {BrowserRouter as Router , Route ,Routes} from 'react-router-dom'

function ShippingScreen() {

const cart = useSelector(state => state.cart)
const {shippingAddress } = cart

const dispatch = useDispatch()
const navigate = useNavigate()

const [address, setAddress] = useState(shippingAddress.address)
const [city, setCity] = useState(shippingAddress.city)
const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
const [country, setCountry] = useState(shippingAddress.country)


const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({address,city,postalCode,country}))
    navigate('/payment')

}

  return (
    <FormContainer>
        <CheckoutSteps  step1 step2 step3 />
        <h2>Shipping</h2>
      <Form onSubmit={submitHandler}>

    <Form.Group controlId='address'>
        <Form.Label>
            Address
        </Form.Label>
        <Form.Control
        required
        type='text'
        placeholder='Enter Address'
        value = {address ? address : ''}
        onChange={(e) => setAddress(e.target.value) }
        >
        </Form.Control>
    </Form.Group>


    <Form.Group controlId='city'>
        <Form.Label>
            City
        </Form.Label>
        <Form.Control
        required
        type='text'
        placeholder='Enter City'
        value = {city ? city : ''}
        onChange={(e) => setCity(e.target.value) }
        >
        </Form.Control>
    </Form.Group>


    <Form.Group controlId='postalCode'>
        <Form.Label>
            Postal Code
        </Form.Label>
        <Form.Control
        required
        type='text'
        placeholder='Enter Postal Code'
        value = {postalCode ? postalCode : ''}
        onChange={(e) => setPostalCode(e.target.value) }
        >
        </Form.Control>
    </Form.Group>


    <Form.Group controlId='country'>
        <Form.Label>
            Country
        </Form.Label>
        <Form.Control
        required
        type='text'
        placeholder='Enter Country'
        value = {country ? country : ''}
        onChange={(e) => setCountry(e.target.value) }
        >
        </Form.Control>
    </Form.Group>

    <br></br>

    <Button type='submit' variant='info'>
        Continue
    </Button>

    </Form>
    </FormContainer>
  )
}

export default ShippingScreen
