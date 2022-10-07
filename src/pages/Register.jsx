import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();
    const [successShow, setSuccessShow] = useState(false);
    const [errorShow, setErrorShow] = useState(false);
    
    const submit = (data) =>{
        axios.post(`https://ecommerce-api-react.herokuapp.com/api/v1/users`, data)
        .then(() => {
            setSuccessShow(true)
        })
        .finally(() =>{
                navigate("/login")
        })
        .catch(error => {
            if (error.response.status === 404) {
                setErrorShow(true)
            }
            console.log(error.response)
        })
    }

    return (
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
            <h1>Register Account</h1>
            <Form onSubmit={handleSubmit(submit)}>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        {...register("firstName")}
                        type="text"
                        placeholder="first-name"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        {...register("lastName")}
                        type="text"
                        placeholder="last-name"
                    />
                </Form.Group>

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

                <Form.Group className="mb-3">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control
                        {...register("phone")}
                        type="phone"
                        placeholder="MUST be longer than 10 digits"
                    />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <Modal
                size="sm"
                show={successShow}
                onHide={() => setSuccessShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        User Created Successfully
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Redirecting to login</Modal.Body>
            </Modal>
            <Modal
                size="sm"
                show={errorShow}
                onHide={() => setErrorShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Error creating a new user
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Contact developer 123421515</Modal.Body>
            </Modal>

        </div>
    );
};

export default Register;