import React, { useEffect, useState } from 'react';
import { Button, ListGroup, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartProductsThunk, purchaseCartThunk, removeProductsFromCartThunk} from '../store/slices/cartProducts.slice';



const CartSideBar = ({show, handleClose}) => {

    const dispatch = useDispatch();
    const productsCart = useSelector(state => state.cartProducts)

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() =>{
        // dispatch(getCartProductsThunk());
        calculateTotalPrice();
    }, [productsCart])

    // useEffect(() =>{
    //     // dispatch(getCartProductsThunk());
    //     calculateTotalPrice();
    // }, [totalPrice])

    const checkOutCart = () =>{
        dispatch(purchaseCartThunk())
        // calculateTotalPrice();
    }

    const removeItemsFromCart = (productId) => {
        // console.log(productId.toString());
         dispatch(removeProductsFromCartThunk(productId.toString()));
        //  calculateTotalPrice();
    }

    const calculateTotalPrice = () =>{
        let total = 0;
        productsCart.forEach(product => {
          total +=  product.price * product.productsInCart?.quantity
        });

        setTotalPrice(total);
    }


    return (
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
                            // <ListGroup.Item>{product.brand}</ListGroup.Item>
                        ))
                    }
                        <p><b>Total Price: </b>{totalPrice}$</p>
                </ListGroup>
                <Button onClick={checkOutCart}>Checkout</Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default CartSideBar;