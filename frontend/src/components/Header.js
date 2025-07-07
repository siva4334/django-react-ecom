import React from 'react'
import { Nav,Navbar,NavDropdown,Container,Row,Col  } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux'
import { logout } from '../actions/UserActions'
import SearchBox from './SearchBox'

function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const dispatch = useDispatch()



  const logoutHandler = () => {
    dispatch(logout())
  }

  return (

      <header>
    <Navbar  bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Clobsoft</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <SearchBox />

          <Nav className="navbar-custom mr-auto">
            <Nav.Link as={Link} to="/cart"><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>

            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>

                <NavDropdown.Item as={Link} to='/profile' >Profile</NavDropdown.Item>

                <NavDropdown.Item onClick={logoutHandler}>LogOut</NavDropdown.Item>

              </NavDropdown>
            ) : (

                          <Nav.Link as={Link} to="/login"><i className='fas fa-user'></i>Login</Nav.Link>

            )}

            { userInfo && userInfo.isAdmin && (
               <NavDropdown title='Admin' id='admin'>
                <NavDropdown.Item as={Link} to='/admin/userlist' > Users</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/admin/productlist' > Products</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/admin/orderlist' > Orders</NavDropdown.Item>

              </NavDropdown>




            ) }

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
     </header>

  )
}

export default Header
