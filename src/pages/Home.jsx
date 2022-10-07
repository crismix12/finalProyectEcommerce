import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import AlertComponent from '../components/AlertComponent';

const Home = () => {

    //Poner un mensaje que diga que estamos en busqueda que sea un estado para
    //hacer aparecer y desaparecer un mensaje
    //indicando limpiar la busqueda

    //solucion
    //que filteredFromState sea Todos los productos de una vez

    const navigate = useNavigate();
    const products = useSelector(state => state.products)
    const filteredProductsFromState = useSelector(state => state.filteredProducts)
    const filteredFromSearch = useSelector(state => state.filteredFromSearchStatus)
    // console.log(products);

    // consumo de api de manera local

    const [categories, setCategories] = useState({});
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [filteredFromState, setFilteredFromState] = useState([]);
    // const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
            .then(res => {
                setCategories(res.data)
                // filteredProductsFromState = products;
                console.log("Renderizado Princ");
            })
            .finally(setProductsFiltered(products))
            // .finally(setProductsFiltered(products))
    }, [products])

    // console.log(categories.data?.categories);
    // console.log(products);

    //Ponemos que solo se renderize si products ha cambiado su valor 
    //por tanto condicionamos que solo se ejecute cuando products
    //cambie!!

    //De otra forma ejecutara setProductsFiltered()
    useEffect(() => {
        // setFilteredFromState(filteredProductsFromState)
        // if(filteredProductsFromState){
            setProductsFiltered(filteredProductsFromState);
            // console.log("renderizado");
        // }
        // if(!filteredProductsFromState){
        //     setProductsFiltered(filteredProductsFromState)
        //     console.log("settingfromState");
        // }else{
        //     setProductsFiltered(products)
        // }
    // }, [products, filteredProductsFromState])
    }, [filteredProductsFromState])

    const filterProducts = (categoryId) => {
        // alert(categoryId)
        //aqui ocurre el cambio a products para reenderizar con el useEffect
        const filtered = products.filter((product) => product.category.id === categoryId)
        // console.log(filtered);
        setProductsFiltered(filtered);
    }

    // const searchProducts = () => {
    //     const filtered = products.filter((product) => 
    //         product.title.toLowerCase().includes(searchValue.toLowerCase())
    //     )
    //     // console.log(filtered);
    //     setProductsFiltered(filtered);
    // }

    return (
            //      {/* <InputGroup className="mb-3">
            //     <Form.Control
            //         placeholder="Search Product"
            //         onChange={e=>setSearchValue(e.target.value)}
            //         value={searchValue}
            //     />
            //     <Button variant="outline-secondary"
            //             onClick={searchProducts}
            //     >
            //         Button
            //     </Button>
            // </InputGroup> */}
        <Row>
            <Col lg={3}>
                <h3>Categories:</h3>
                <ListGroup>
                {
                    categories.data?.categories.map(category => (
                        <ListGroup.Item
                        variant="flush" 
                        key={category.id} 
                        onClick={() => filterProducts(category.id)}
                        style={{cursor: "pointer"}}
                        >
                            {category.name}
                        </ListGroup.Item>
                        // <button key={category.id}>{category.name}</button>
                    ))
                }

                </ListGroup>
            </Col>

            <Col>
            
            <Col >{filteredFromSearch.searchStatus && <AlertComponent/>}</Col>

            <Row xs = {1} sm = {2} md = {2} xl = {3} className="g-3">
                
                {
                     productsFiltered.map(product => (
                        <Col key={product.id}>
                            <Card onClick={() => navigate(`/productDetail/${product.id}`)}>
                                <Card.Img className='img-fluid img-thumbnail p-4' variant='top' src={product?.productImgs[0]} style = {{height: "350px", objectFit:"contain"}} />
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Text>
                                        {/* {product.description} */}
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