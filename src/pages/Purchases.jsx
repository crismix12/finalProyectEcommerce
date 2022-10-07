import React, { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch();
    const purchases = useSelector(state => state.purchases)
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

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