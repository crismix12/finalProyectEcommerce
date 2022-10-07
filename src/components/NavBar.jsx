import React, { useEffect, useState } from 'react';
// import { Button, Offcanvas } from 'react-bootstrap';
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
// import { Form, Link } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredProducts } from '../store/slices/productsFiltered.slice';
import { Link, useNavigate } from 'react-router-dom';
import CartSideBar from './CartSideBar';
import { setCartProducts } from '../store/slices/cartProducts.slice';
import { setFilteredStatus } from '../store/slices/isFilteredFromSearch.slice';


const NavBar = () => {

  const navigate = useNavigate();

  const products = useSelector(state => state.products)

  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.setItem("token", "");
    dispatch(setCartProducts([]));
    navigate("/login");
  };

  const searchProducts = () => {
    const searchData = {
      searchStatus: true,
      searchValue: searchValue
    }

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
    )

    dispatch(setFilteredStatus(searchData))
    dispatch(getFilteredProducts(filtered))
  }

  useEffect(() => {
    dispatch(getFilteredProducts(products))
  }, [products])


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return (

    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand to="/" as={Link}>Ecommerce</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/purchases">Purchases</Nav.Link>
                <Nav.Link onClick={handleShow}>Cart</Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  placeholder="Search Product"
                  onChange={e => setSearchValue(e.target.value)}
                  value={searchValue}
                />
                <Button variant="outline-success"
                  onClick={searchProducts}
                >
                  Search
                </Button>
              </Form>

            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <CartSideBar show={show} handleClose={handleClose} />
    </>
  );
};

export default NavBar;