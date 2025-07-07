import React from 'react'
import { Pagination , Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link , useNavigate  } from 'react-router-dom'

function Paginate({pages,page,keyword='',isAdmin=false}) {

    if(keyword === null){
        keyword=''
    }
    if(page === null){
        page=1
    }

    const navigate = useNavigate()

    const handlePageChange = (page) => {
        if(isAdmin){
           navigate(`/admin/productlist/?keyword=${keyword}&page=${page}`)
        }else{
            navigate(`/?keyword=${keyword}&page=${page}`)
        }
    }

    console.log("PAGES :",pages)
    console.log("PAGE :",page)
    return ( pages > 1 && (
        <Pagination>
            {

                // [...Array(pages).keys()].map((x) => (

                //     <Link
                //     key={x+1}
                //     to={`/?keyword=${keyword}&page=${x+1}`}
                //     >

                //         <Pagination.Item active={x+1 === page}>
                //             {x+1}
                //         </Pagination.Item>
                //     </Link>
                // ))

                <Row>
                <Col>
                <Link to={ !isAdmin ?
                        `/?keyword=${keyword}&page=1`
                         : `/admin/productlist/?keyword=${keyword}&page=1`
                } >
                     <Pagination.Item active={1=== 1}>1</Pagination.Item>
                </Link>
            </Col>
            <Col>
                <Link to={ !isAdmin ?
                        `/?keyword=${keyword}&page=2`
                         : `/admin/productlist/?keyword=${keyword}&page=2`
                } >
                     <Pagination.Item active={2===2}>2</Pagination.Item>
                </Link>
                </Col>

            <Col>
               <Link to={ !isAdmin ?
                        `/?keyword=${keyword}&page=3`
                         : `/admin/productlist/?keyword=${keyword}&page=3`
                } >
                     <Pagination.Item active={3=== 3}>3</Pagination.Item>
                </Link>
                </Col>

            <Col>
                <Link to={ !isAdmin ?
                        `/?keyword=${keyword}&page=4`
                         : `/admin/productlist/?keyword=${keyword}&page=4`
                } >
                     <Pagination.Item active={4=== 4}>4</Pagination.Item>
                </Link>
                </Col>
  </Row>
            }
        </Pagination>
    )
  )
}

export default Paginate
