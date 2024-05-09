import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from "../components/FormContainer";
import { toast } from 'react-toastify';
import axios from "axios";

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault()
        
        const loginUser = async () => {

            try {
                const res = await axios.post(`/api/users/login`, {
                    email: email,
                    password: password
                });
                let userData = res.data;
                console.log(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                navigate('/')
            } catch (error) {
                toast.error(error?.response?.data?.message || error.error)
            }
        }

        loginUser()
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email" className="my-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId="password" className="my-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary" className="mt-2">
                    Sign In
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    New Customer? <Link to='/register'>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen