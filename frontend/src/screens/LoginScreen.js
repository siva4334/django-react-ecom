import React , {useState, useEffect} from 'react'
import { Link , useLocation , useNavigate  } from 'react-router-dom'
import { Form, Button,Row,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/UserActions'
import { Nav,Navbar,NavDropdown  } from 'react-bootstrap'

function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

     const navigate = useNavigate()

    const location = useLocation()
    const redirect = location.search ? location.search.split('=')[1] : '/'
    console.log("printing location search", location.search)
    console.log("printing redirect", redirect)

    const userLogin = useSelector(state => state.userLogin)

    const { error, loading , userInfo} = userLogin

    console.log('user info from login screen before condition ', userInfo)

   useEffect(() => {
    if(userInfo){
        console.log('user info from login screen ', userInfo)
           navigate(redirect)
    }
   },[navigate,userInfo,redirect])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email,password))
    }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      { error &&  <Message variant='danger' > {error } </Message>}
      { loading && <Loader> </Loader>}
      <Form onSubmit={submitHandler}>

        <Form.Group controlId='email'>
            <Form.Label>
                Email Address
            </Form.Label>
            <Form.Control
            type='email'
            placeholder='Enter Email'
            value = {email}
            onChange={(e) => setEmail(e.target.value) }
            >
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
            <Form.Label>
                Password
            </Form.Label>
            <Form.Control
            type='password'
            placeholder='Enter Password'
            value = {password}
            onChange={(e) => setPassword(e.target.value) }
            >
            </Form.Control>
        </Form.Group>
    <br></br>
    <Button type='submit' variant='info'>
        Sign In
         </Button>

      </Form>

    <Row className='py-3'>
        <Col>
        New Customer ? <Link to = {redirect ? `/register?redirect=${redirect}` : '/register'}>
        Register </Link>
        </Col>
    </Row>

    </FormContainer>
  )
}

export default LoginScreen
