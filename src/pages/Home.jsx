import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Form, useNavigate } from 'react-router-dom';
import AlertComponent from '../components/AlertComponent';

const Home = () => {

    const navigate = useNavigate();
    const products = useSelector(state => state.products)
    const filteredProductsFromState = useSelector(state => state.filteredProducts)
    const filteredFromSearch = useSelector(state => state.filteredFromSearchStatus)

    // consumo de api de manera local

    const [categories, setCategories] = useState({});
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [lowestPrice, setLowestPrice] = useState(0);
    const [highestPrice, setHighestPrice] = useState(0);

    useEffect(() => {
        axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
            .then(res => {
                setCategories(res.data)
            })
            .finally(setProductsFiltered(products))
    }, [products])

    useEffect(() => {
        setProductsFiltered(filteredProductsFromState);
    }, [filteredProductsFromState])

    const filterProducts = (categoryId) => {
        const filtered = products.filter((product) => product.category.id === categoryId)
        setProductsFiltered(filtered);
    }

    const setAllProducts = () => {
        setProductsFiltered(products);
    }

    const filterByLimits = () => {
        const filtered = products.filter(product => {
            return parseInt(product.price) >= lowestPrice && parseInt(product.price) <= highestPrice;
        });
        setProductsFiltered(filtered);
    };


    return (
        <Row>
            <Col lg={3}>
                <h3>Categories:</h3>
                <ListGroup>
                    <ListGroup.Item
                        onClick={setAllProducts}
                        style={{ cursor: "pointer" }}
                    >
                        All Products
                    </ListGroup.Item>
                    {
                        categories.data?.categories.map(category => (
                            <ListGroup.Item
                                variant="flush"
                                key={category.id}
                                onClick={() => filterProducts(category.id)}
                                style={{ cursor: "pointer" }}
                            >
                                {category.name}
                            </ListGroup.Item>
                        ))
                    }

                </ListGroup>
                <Row className='mt-3'>
                    <h3>Filter Products by Price</h3>
                    <div>
                        <p>Set lowest price</p>
                        <input
                            type={'number'}
                            placeholder="Lowest Price"
                            onChange={e => setLowestPrice(e.target.value)}
                            value={lowestPrice}
                        />
                        <p className='mt-3'>Set Highest price</p>
                        <input
                            type={'number'}
                            placeholder="Highest Price"
                            onChange={e => setHighestPrice(e.target.value)}
                            value={highestPrice}
                        >
                        </input>
                        <Button
                            className='mt-2'
                            onClick={filterByLimits}
                        >
                            Filter
                        </Button>
                    </div>
                </Row>
            </Col>

            <Col>

                <Col >{filteredFromSearch.searchStatus && <AlertComponent />}</Col>

                <Row xs={1} sm={2} md={2} xl={3} className="g-3">

                    {
                        productsFiltered.map(product => (
                            <Col key={product.id}>
                                <Card
                                    onClick={() => navigate(`/productDetail/${product.id}`)}
                                    style={{ cursor: "pointer" }}>
                                    <Card.Img className='img-fluid img-thumbnail p-4' variant='top' src={product?.productImgs[0]} style={{ height: "350px", objectFit: "contain" }} />
                                    <Card.Body>
                                        <Card.Title>{product.title}</Card.Title>
                                        <Card.Text>
                                            <b>Price: </b>{product.price}$
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </Col>
        </Row>

    );
};

export default Home;