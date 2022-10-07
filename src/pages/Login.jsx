import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Alert, Overlay, Tooltip } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
const Login = () => {

    const { register, handleSubmit } = useForm();

    const [show, setShow] = useState(false);
    const target = useRef(null);

    const navigate = useNavigate();
    const submit = (data) => {

        axios.post(`https://ecommerce-api-react.herokuapp.com/api/v1/users/login`, data)
            .then((res) => {
                localStorage.setItem("token", res.data.data.token)
                navigate("/");
            })
            .catch(error => {
                if (error.response.status === 404) {
                    alert("Credenciales invalidas")
                }
                console.log(error.response)
            })
    }

    return (
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
            <div style={{ textAlign: "center" }}>
                <h3>Click me!</h3>
                <Button ref={target} onClick={() => setShow(!show)}>
                    Test Credentials
                </Button>
                <Overlay target={target.current} show={show} placement="right">
                    {(props) => (
                        <Tooltip id="overlay-example" {...props}>
                            <p><b>Username: </b> crismi@gmail.com</p>
                            <p><b>Password: </b> crismi1234</p>
                        </Tooltip>
                    )}
                </Overlay>
            </div>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit(submit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        {...register("email")}
                        type="email"
                        placeholder="Enter email"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        {...register("password")}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>

                <Alert key={'primary'} variant={'primary'}>
                    Do not have an Account?
                    Click <a href='/#/register'>here</a> to create one!
                </Alert>
            </Form>
        </div>
    );
};

export default Login;