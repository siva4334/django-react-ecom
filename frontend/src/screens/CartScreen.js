import React , {useEffect} from 'react'
import { Link , useParams , useLocation  } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Row , Col, ListGroup , Image ,
Form,Button,Card
} from 'react-bootstrap'

import  Message  from '../components/Message'
import  {addToCart, removeFromCart }  from '../actions/CartActions'
 import { useNavigate  } from 'react-router-dom'

function CartScreen({match, Location, history}) {

  const navigate = useNavigate()
  const {id} = useParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const qty = queryParams.get('qty')
  console.log('qty:',qty)
  console.log('product id :' , id)

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)

  const {cartItems} = cart
  console.log('cart Items are' , cartItems)

  useEffect(() => {
    if(id){
      dispatch(addToCart(id,qty))
    }
  }, [dispatch,id,qty])

const removeFromCartHandler = (id) => {
  dispatch(removeFromCart(id))
}

const checkoutHandler = () =>
{
   navigate('/shipping')
  //  /login?redirect=shipping
}

  return (
<Row>
  <Col md = {8}>
    <h1>Shopping Cart</h1>
    { cartItems.length === 0 ? (
      <div>
      <Message variant='info'>
        Your Cart is empty
      </Message>
       <Link to='/' className='btn btn-info my-3'>Go Back</Link>
       </div>
    ) : (
      <ListGroup variant='flush'>
        {cartItems.map(item => (
          <ListGroup.Item key={item.product}>
            <Row>
              <Col md= {2}>
              <Image src = {item.image} alt= {item.name} fluid rounded />
              </Col>
              <Col md={3}>
              <Link to={`/product/${item.product}`}>{item.name}</Link>
              </Col>
              <Col md={2}>
              ${item.price}
              </Col>
              <Col md= {3}>

              <Form.Control className='form-select' as="select" value={item.qty}
              onChange={(e) => dispatch(addToCart(item.product,Number(e.target.value)))}
              >
                  {

                      [...Array(item.countInStock).keys()].map((x) => (
                          <option key= {x+1 } value ={x+1}>
                              {x+1}
                          </option>
                      ) )
                  }
              </Form.Control>

              </Col>
                  <Col md={1}>
                  <Button type='button' variant='danger'
                  onClick={() => removeFromCartHandler(item.product)}
                  >
                    <i className='fas fa-trash'></i>

                  </Button>
                  </Col>
            </Row>
          </ListGroup.Item>

        ))}
      </ListGroup>

    )}
  </Col>

  <Col md = {4}>
      <Card>
        <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtoal ({cartItems.reduce((acc,item) => acc + item.qty,0 )}) items </h2>
              ${cartItems.reduce((acc,item) => acc + item.qty * item.price,0 )}
            </ListGroup.Item>
        </ListGroup>
<ListGroup>
<ListGroup.Item>
  <center>
  <Button type='button' className='btn-info'
  disabled= {cartItems.length === 0}
  onClick={checkoutHandler}
  >
      Proceed to Checkout
  </Button>
  </center>
</ListGroup.Item>
</ListGroup>
      </Card>
  </Col>
</Row>
  )
}

export default CartScreen
