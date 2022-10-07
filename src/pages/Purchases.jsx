import React, { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch();
    const purchases = useSelector(state => state.purchases)
    const navigate = useNavigate();
    // const products = useSelector(state => state.purchases.cart?.products)

    // console.log(products);
    // console.log(purchases);

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])

    // const event = new Date(purchases[0].createdAt);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


    // console.log(event);
    // expected output (varies according to local timezone and default locale): Thursday, December 20, 2012


    return (
        <div>
            <h1>Purchases</h1>

            {
                purchases.map((purchase) => (
                      
                    <ListGroup key={purchase.id}>
                        <ListGroup.Item className='mt-2'>
                            <h3>List of Items</h3>
                            <p className=''><b>Purchased At:</b> {new Date(purchase.createdAt).toLocaleDateString(undefined, options)}</p>
                            {
                                purchase.cart.products.map((product) => (
                                    // <ListGroup  key= {product.id}>
                                    <ListGroup.Item 
                                                    key= {product.id}
                                                    onClick={() => navigate(`/productDetail/${product.id}`)}
                                                    style={{cursor:'pointer'}}
                                    >
                                        <h4>{product.title}</h4>
                                        <p>{product.description}</p>
                                        <p><b>Price: </b>{product.price}</p>
                                        <p><b>Brand: </b>{product.brand}</p>
                                    </ListGroup.Item>
                                    // {/* </ListGroup> */}
                                ))
                            }
                        </ListGroup.Item>
                    </ListGroup>
                ))
            }

        </div>
    );
};

export default Purchases; <h1>Purchases</h1>