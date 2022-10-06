import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../styles/Form.css';

const Login = () => {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    //john@gmail.com john1234
    const submit = (data) => {
        console.log(data)
        axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', data)
            .then(res => {
                localStorage.setItem("token", res.data.data.token)
                alert("User logged")
                navigate("/")
            })
            .catch((error) => {
                if (error.response?.status === 404) {
                    alert("user not found")
                } else {
                    console.log(error.response)
                }
            })
    }
    return (
        <div className='form-container'>
            <div className="form-outline">
            <div className='user-Info'>
                <p>
                    Join with this email and password <br />
                    email: eve@gmail.com <br />
                    password: eve1234
                </p>
            </div>
                <Form onSubmit={handleSubmit(submit)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" {...register("email")} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" {...register("password")} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Login;