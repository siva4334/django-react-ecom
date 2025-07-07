import React , {useState, useEffect} from 'react'
import { Link , useLocation , useNavigate} from 'react-router-dom'
import { Table, Button, Row , Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listProducts , deleteProduct , createProduct} from '../actions/ProductActions'
import { PRODUCT_CREATE_RESET } from '../constants/ProductConstants'

function ProductListScreen() {

const dispatch = useDispatch()

const navigate = useNavigate()

 const productList = useSelector(state => state.product)
 const {error , loading, products , pages, page} = productList

 const productDelete = useSelector(state => state.productDelete)
 const {error:errorDelete , loading:loadingDelete, success:successDelete } = productDelete

 const productCreate = useSelector(state => state.productCreate)
 const {error:errorCreate , loading:loadingCreate, success:successCreate,product:createdProduct } = productCreate

 console.log("pringting products information")
 console.log(products)

const userLogin = useSelector(state => state.userLogin)
const { userInfo} = userLogin

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  let keyword = queryParams.get('keyword')
  let pageno = queryParams.get('page')
  let searchpath=''

  console.log("printing keyword")
  console.log(keyword)

console.log("printing pageno")
  console.log(pageno)
  console.log(page)

  if(keyword && pageno){
  searchpath = "?keyword=" + keyword + "&page=" + pageno
  }else if (keyword === null || keyword===''){
    searchpath="?page=" + pageno
  } else if (pageno === null) {
    searchpath = "?page=1"
  }

  console.log("printing entire search path")
  console.log(searchpath)

useEffect(() => {
    dispatch({type:PRODUCT_CREATE_RESET})

    if(!userInfo.isAdmin){
        navigate('/login')
    }
    if(successCreate){
        navigate(`/admin/product/${createdProduct._id}/edit`)
    }else {
        dispatch(listProducts(searchpath))
    }

},[dispatch , userInfo,successDelete,successCreate,createProduct,searchpath])


const deleteHandler = (id) => {

    if(window.confirm('Are you sure you want to delete this product ?')){
        dispatch(deleteProduct(id))
    }
}

const createProductHandler = (product) => {
    dispatch(createProduct())
}

  return (
    <div>
        <Row className='align-items-center'>
            <Col>
            <h1> Products </h1>
            </Col>

            <Col className='text-right'>
            <Button className='my-3' onClick={createProductHandler}>
              <i className='fas fa-plus'></i>  Create Product
            </Button>
            </Col>

        </Row>

        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

        {loading
        ? <Loader />
        : error
            ? <Message variant='danger'> {error}</Message>
            : (
                <div>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                       <th>BRAND</th>
                        <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map( product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                            <td>
                                <Link to={`/admin/product/${product._id}/edit`}>
                                <Button variant='light' className='btn-sm'>
                                     <i className='fas fa-edit' ></i>
                                </Button>
                                </Link>

                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                     <i className='fas fa-trash' ></i>
                                </Button>

                            </td>

                            </tr>
                        ))}

                    </tbody>

                </Table>
                <Paginate pages={pages} page={page} isAdmin={true} />
                </div>
            )}
    </div>
  )
}

export default ProductListScreen
