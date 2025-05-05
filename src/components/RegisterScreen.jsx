import React, {useState, useEffect} from 'react'
import { Link, redirect, useNavigate, useLocation} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader';
import Message from '../Message';
import { register } from '../actions/userAction'
import Header from "../Header"; 
import Footer from "../Footer";
import FormContainer from "../FormContainer";


function RegisterScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch()


    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const {loading, userInfo, error} = userRegister

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])


    const submitHandler = (event) => {
        event.preventDefault();

        if(password != confirmPassword){
            setMessage('Password does not match')
        }else{
            dispatch(register(name, email, password))
        }
        
    }


  return (
    <div>
        <Header />
            <main className='py-3'>
                <FormContainer>
                    <h1>Sign In</h1>
                    {message &&  <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                            required
                            type='name'
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                            required
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                            required
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='passwordConfirm'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control 
                            required
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        
                        <Button type='submit'>
                            Register
                        </Button>
                    </Form>

                    <Row className='py-3'>
                        <Col>
                            Have an Account? <Link 
                            to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In</Link>
                        </Col>
                    </Row>


                </FormContainer>
            </main>
        <Footer />    
    </div>
  )
}

export default RegisterScreen