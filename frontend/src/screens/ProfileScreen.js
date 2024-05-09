import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col } from "react-bootstrap"
import { useSelector } from 'react-redux'
import { LinkContainer } from "react-router-bootstrap"
import { toast } from 'react-toastify'

const ProfileScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [orders, setOrders] = useState([]);

    const userInfo  = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email)
    }, [userInfo.name, userInfo.email])

    useEffect(() => {
        const getOrders = async () => {

            try {
                const {data} = await axios.get(`/api/orders/mine`);
                setOrders(data);
                console.log("orders",orders);
                
            } catch (error) {
                toast.error(error?.response?.data?.message || error.error)
            }
        }

        getOrders()
    }, [])

    const SubmitHandler = (e) => {
        e.preventDefault();

        const updateUser = async () => {

            try {
                const res = await axios.put(`/api/users/profile`, {
                    name: name,
                    email: email,
                    password: password
                });
                let userData = res.data;
                console.log(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                toast.success('Profile updated successfully!')
                setPassword('')
                
            } catch (error) {
                toast.error(error?.response?.data?.message || error.error)
            }
        }

        updateUser()
    }
    
  return (
    <Row>
        <Col md={3}>
        <h2>User Profile</h2>

        <Form onSubmit={SubmitHandler}>
            <Form.Group controlId='name' className='my-2'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className='my-2'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password' className='my-2'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-2'>
                Update
            </Button>
        </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
            <Table striped hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 && orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>{order.totalPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Col>
    </Row>
  )
}

export default ProfileScreen