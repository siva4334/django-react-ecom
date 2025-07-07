import React , {useState, useEffect} from 'react'
import { Link , useLocation , useNavigate} from 'react-router-dom'
import { Form, Button,Row,Col ,Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails , updateUserProfile } from '../actions/UserActions'
import { USER_UPDATE_PROFILE_RESET  } from '../constants/UserConstants'
// import { ORDER_LIST_MY_SUCCESS } from '../constants/OrderConstants'
import { listMyOrders } from '../actions/OrderActions'

function ProfileScreen() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [variant, setVariant] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate()
    const location = useLocation()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading , user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success} = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading:loadingOrders, error:errorOrders, orders} = orderListMy

   useEffect(() => {
    if(!userInfo){
       navigate('/login')
    }else if (success) {
       navigate('/')
    } else {
        if(!user || !user.name || success || userInfo._id !== user._id){
          dispatch({type:USER_UPDATE_PROFILE_RESET})
          dispatch(getUserDetails('profile'))
          dispatch(listMyOrders())
        //  dispatch({
        //     type: ORDER_LIST_MY_SUCCESS
        //  })

        } else {
            setName(user.name)
            setEmail(user.email)
        }
    }
   },[navigate,userInfo,user, success])


    const submitHandler = (e) => {
        e.preventDefault()
        if (password != confirmPassword){
            setVariant('')
            setMessage('Passwords Do Not Match')

        } else {
          dispatch(updateUserProfile({
            'id': user._id,
            'name': name,
            'email': email,
            'password': password
          }))
          setMessage('Profile Updated Successfully')
          setVariant('success')
        }
    }

  return (
<Row>
    <Col md={3}>
    <h2> User Profile</h2>

      { message && variant==='' && <Message variant='danger' > {message } </Message>}
      { variant && message && <Message variant={variant} > {message } </Message>}
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
            type='password'
            placeholder='Confirm Password'
            value = {confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value) }
            >
            </Form.Control>
        </Form.Group>
        <br></br>
    <Button type='submit' variant='info'>
        Update
         </Button>
      </Form>

    </Col>

    <Col md={9}>
    <h2> My Orders</h2>
    {loadingOrders ? (
        <Loader />
    ) : errorOrders ? (
        <Message variant='danger'> { errorOrders} </Message>
    ): (
        <Table striped responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {orders.map(order => (
                    <tr key={order._id}>
                        <td> {order._id} </td>
                        <td> {order.createdAt.substring(0,10)} </td>
                        <td> {order.totalPrice} </td>
                        <td> {order.isPaid ? order.paidAt : (
                        <i className='fas fa-times' style = {{ color: 'red'}}></i>
                        ) } </td>
                        <td> <Link to = {`/order/${order._id}`} >
                        <Button className='btn-sm'>Details </Button>
                        </Link>
                        </td>

                    </tr>
                ))}
            </tbody>
        </Table>
    )}

    </Col>

</Row>
  )
}

export default ProfileScreen
