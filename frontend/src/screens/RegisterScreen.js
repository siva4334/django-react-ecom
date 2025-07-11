import React , {useState, useEffect} from 'react'
import { Link , useLocation , useNavigate} from 'react-router-dom'
import { Form, Button,Row,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/UserActions'


function RegisterScreen() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate()
    const location = useLocation()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)

    const { error, loading , userInfo} = userRegister

    console.log('user info from register screen before condition ', userInfo)

   useEffect(() => {
    if(userInfo){
        console.log('user info from register screen ', userInfo)
           navigate(redirect)
    }
   },[navigate,userInfo,redirect])


    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword){
            setMessage('Passwords Do Not Match')
        } else {
        dispatch(register(name,email,password))
        }
    }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      { message &&  <Message variant='danger' > {message } </Message>}
      { error &&  <Message variant='danger' > {error } </Message>}
      { loading && <Loader> </Loader>}
      <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control
                    required
                    type='name'
                    placeholder='Enter Name'
                    value = {name}
                    onChange={(e) => setName(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='email'>
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control
                    required
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
            required
            type='password'
            placeholder='Enter Password'
            value = {password}
            onChange={(e) => setPassword(e.target.value) }
            >
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
            <Form.Label>
                Confirm Password
            </Form.Label>
            <Form.Control
            required
            type='password'
            placeholder='Confirm Password'
            value = {confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value) }
            >
            </Form.Control>
        </Form.Group>
        <br></br>
    <Button type='submit' variant='info'>
        Register
         </Button>
      </Form>


    <Row className='py-3'>
        <Col>
        Have Already Account ? <Link to = {redirect ? `/login?redirect=${redirect}` : '/login'}>
        Sing In
        </Link>
        </Col>
    </Row>

    </FormContainer>
  )
}

export default RegisterScreen
