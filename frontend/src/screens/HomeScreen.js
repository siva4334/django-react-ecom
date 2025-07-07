import React, { useState,useEffect} from 'react'
import { Row,Col } from 'react-bootstrap'
import Product from '../components/Product'
// import axios from 'axios'
import { Link , useParams , useLocation  } from 'react-router-dom'

import { useDispatch,useSelector } from 'react-redux'
import { listProducts } from '../actions/ProductActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

function HomeScreen({history,match, Location}) {
  // const [products, setProducts] = useState([])

  const dispatch = useDispatch ()
 const productList = useSelector(state => state.product)
 const {error , loading, products , page, pages } = productList


  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  let keyword = queryParams.get('keyword')
  let pageno = queryParams.get('page')
  let searchpath=''

  console.log("printing keyword")
  console.log(keyword)

  if(keyword && pageno){
  searchpath = "?keyword=" + keyword + "&page=" + pageno
  }else if (keyword === null || keyword===''){
    searchpath="?page=" + pageno
  } else if (pageno === null) {
    searchpath = "?page=1"
  }

  console.log("printing entire search path")
  console.log(searchpath)



  useEffect( () => {

    dispatch(listProducts(searchpath))
    // async function fetchProducts(params) {
    //   const { data } = await axios.get('api/products/')
    //   setProducts(data)
    // }
    // fetchProducts()
  },[dispatch,searchpath])


  return (
    <div>

     {!keyword && <ProductCarousel /> }
      <h1> Latest Products</h1>
    { loading ? <Loader />
              : error ? <Message variant='danger'>{error}</Message>
              :
              <div>
              <Row>
        {products.map(
            product =>
            (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
            )
        )}
      </Row>
      <Paginate page={page} pages={pages} keyword = {keyword}/>
        </div>
            }

    </div>
  )
}

export default HomeScreen
