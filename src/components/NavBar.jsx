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


  const productsCart = useSelector(state => state.cartProducts)
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
    // const searchStatus = true;

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
    )

    // const filteredData = {
    //   searchStatus: searchStatus,
    //   filtered: filtered
    // }

    dispatch(setFilteredStatus(searchData))
    dispatch(getFilteredProducts(filtered))

    // if(!filtered){
    //   console.log(filtered);
    //   dispatch(getFilteredProducts(filtered))
    // }else{
    //   console.log("navBar");
    //   // console.log(products);
      // dispatch(getFilteredProducts(products))
    // }
    // setProductsFiltered(filtered);
  }

  useEffect(() => {
    // searchProducts();
    dispatch(getFilteredProducts(products))
  },[products])


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return (
    // <Navbar bg="primary" variant="dark" expand="lg">
    //   <Container>
    //     <Navbar.Brand to="/" as={Link}>Ecommerce</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //     <Navbar.Collapse id="responsive-navbar-nav">
    //       <Nav className="me-auto">
    //         <Nav.Link as={Link} to="/login">Login</Nav.Link>
    //         <Nav.Link as={Link} to="/purchases">Purchases</Nav.Link>
    //         <Nav.Link>Cart</Nav.Link>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
    //   <Navbar bg="light" expand="lg">
    //   <Container fluid>
    //     <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="navbarScroll" />
    //     <Navbar.Collapse id="navbarScroll">
    //       <Nav
    //         className="me-auto my-2 my-lg-0"
    //         style={{ maxHeight: '100px' }}
    //         navbarScroll
    //       >
    //         <Nav.Link href="#action1">Home</Nav.Link>
    //         <Nav.Link href="#action2">Link</Nav.Link>
    //         <Nav.Link href="#" disabled>
    //           Link
    //         </Nav.Link>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand to="/" as={Link}>Ecommerce</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            // placement="start"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                Offcanvas
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
                  Button
                </Button>
              </Form>

            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <CartSideBar show={show} handleClose={handleClose}/>
    </>
  );
};

export default NavBar;