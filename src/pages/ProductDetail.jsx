import React, { useEffect, useState } from 'react';
import { Button, Col, ListGroup, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addProductsToCartThunk } from '../store/slices/cartProducts.slice';
import Carousel from 'react-bootstrap/Carousel';



const ProductDetail = () => {

    const { id } = useParams();

    const [smShow, setSmShow] = useState(false);

    const productsList = useSelector(state => state.products)

    const productsDetail = productsList.find(product => product.id === Number(id));

    const relatedProducts = productsList.filter(product => (product.category.id === productsDetail.category.id) && (product.id !== Number(id)))


    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(5);

    const addItem = () => {
        const product = {
            id: id,
            quantity: quantity
        }
        setSmShow(true);
        dispatch(addProductsToCartThunk(product));
    }

    useEffect(() => {
        setQuantity(5);
    }, [id])


    return (
        <Row>
            <Col>

                <Row style={{ textAlign: "center" }}>
                    <h1>{productsDetail?.title}</h1>
                    <div className='d-flex justify-content-evenly align-items-center'>
                        <div>
                            <p>Select Quantity:</p>
                            <Button className="me-3" onClick={() => setQuantity(quantity - 1)}>
                                -
                            </Button>
                            {quantity}
                            <Button className="ms-3" onClick={() => setQuantity(quantity + 1)}>
                                +
                            </Button>
                        </div>

                        <div>
                            <Button onClick={addItem} className="mt-2">Add to Cart</Button>
                        </div>
                    </div>
                </Row>

                <Carousel>
                    <Carousel.Item>
                        <div className='d-flex justify-content-center'>
                            <img
                                className="d-block w-30 p-2"
                                src={productsDetail?.productImgs[0]}
                                alt="First slide"
                                style={{ height: "50vh" }}
                            />
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className='d-flex justify-content-center'>
                            <img
                                className="img-fluid d-block w-30 p-2"
                                src={productsDetail?.productImgs[1]}
                                alt="Second slide"
                                style={{ height: "50vh" }}
                            />
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className='d-flex justify-content-center'>
                            <img
                                className="img-fluid d-block w-30 p-2"
                                src={productsDetail?.productImgs[2]}
                                alt="Third slide"
                                style={{ height: "50vh" }}
                            />
                        </div>
                    </Carousel.Item>
                </Carousel>
                <Row>
                    <h3><b>Price:</b> {productsDetail?.price} $</h3>
                </Row>
                <Row>
                    <p><b>Description:</b></p>
                    <p>{productsDetail?.description}</p>
                </Row>

            </Col>
            <Col lg={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h4><b>Related products:</b></h4>
                    </ListGroup.Item>
                    {
                        relatedProducts.map(product => (
                            <ListGroup.Item key={product.id}>
                                <Link to={`/productDetail/${product.id}`}>
                                    <p>{product.title}</p>
                                    <img className='img-fluid'
                                        src={product?.productImgs[0]}
                                        alt=""
                                        style={{ height: "30vh" }}
                                    />
                                </Link>
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </Col>
            <Modal
                size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Product Added to Cart
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body><p><b>Product name: </b>{productsDetail?.title}</p></Modal.Body>
            </Modal>

        </Row>
    );
};

export default ProductDetail;