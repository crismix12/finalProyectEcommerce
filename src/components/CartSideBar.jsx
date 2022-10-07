import React, { useEffect, useState } from 'react';
import { Button, ListGroup, Modal, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartProductsThunk, purchaseCartThunk, removeProductsFromCartThunk } from '../store/slices/cartProducts.slice';



const CartSideBar = ({ show, handleClose }) => {

    const dispatch = useDispatch();
    const productsCart = useSelector(state => state.cartProducts)

    const [totalPrice, setTotalPrice] = useState(0);
    const [smShow, setSmShow] = useState(false);

    useEffect(() => {
        calculateTotalPrice();
    }, [productsCart])

    useEffect(() => {
        dispatch(getCartProductsThunk());
    }, [show])

    const checkOutCart = () => {
        dispatch(purchaseCartThunk())
        setSmShow(true)
    }

    const removeItemsFromCart = (productId) => {
        dispatch(removeProductsFromCartThunk(productId.toString()));
    }

    const calculateTotalPrice = () => {
        let total = 0;
        productsCart.forEach(product => {
            total += product.price * product.productsInCart?.quantity
        });

        setTotalPrice(total);
    }


    return (
        <>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Cart Products</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup>
                        {
                            productsCart.map((product) => (
                                <ListGroup.Item key={product.id}>


                                    <div>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div>
                                                <Link to={`/productDetail/${product.id}`}>{product.title}</Link>
                                                <p><b>Marca: </b>{product.brand}</p>
                                            </div>
                                            <div>
                                                <Button onClick={() => removeItemsFromCart(product.id)}
                                                    variant="danger"
                                                >
                                                    Remove Item
                                                </Button>
                                            </div>
                                        </div>

                                        <div className='d-flex justify-content-between align-items-center'>
                                            <p><b>Price: </b>{product.price * product.productsInCart?.quantity}$</p>
                                            <p><b>Quantity: </b>{product.productsInCart?.quantity}</p>
                                        </div>

                                    </div>

                                </ListGroup.Item>
                            ))
                        }
                        <p><b>Total Price: </b>{totalPrice}$</p>
                    </ListGroup>
                    <Button onClick={checkOutCart}>Checkout</Button>
                </Offcanvas.Body>
            </Offcanvas>
            <Modal
                size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Thanks for your choice
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body><p><b>Check your purchases tab</b></p></Modal.Body>
            </Modal>
        </>
    );
};

export default CartSideBar;