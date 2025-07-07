import React , {useState} from 'react'
import {  Button, Form , Row, Col} from 'react-bootstrap'
import { useNavigate  } from 'react-router-dom'

function SearchBox() {

const [keyword , setKeyword] = useState('')

const navigate = useNavigate()

const submitHandler = (e) => {
    e.preventDefault()
    if(keyword){
        navigate(`/?keyword=${keyword}&page=1`)
    } else {
        navigate(-1)
    }
}
  return (
<Form onSubmit={submitHandler}>
    <Row>

    <Col>
    <Form.Control
    type='text'
    name='q'
    // placeholder='Search'
    onChange={ (e) => setKeyword(e.target.value)}
    className='mr-sm-2 ml-sm-5'
    >
    </Form.Control>
    </Col>
<Col>
<Button
type='submit'
variant='outline-success'
className='p-2'
>
Search
</Button>
</Col>
</Row>
</Form>
  )
}

export default SearchBox
