import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userInfoCreate } from '../../store/modules/user';
import './NavBar.css';

function BasicExample() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      userInfoCreate({
        id: sessionStorage.id,
        name: sessionStorage.name,
        nickName: sessionStorage.nickName,
        city: sessionStorage.city,
        phone: sessionStorage.phone,
      })
    );
  }, []);

  const info = useSelector((state) => state.user.userInfo);
  console.log('로그인상태', info);

  const logout = () => {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('nickName');
    sessionStorage.removeItem('phone');
    sessionStorage.removeItem('city');
    navigate('/');
  };
  return (
    <Navbar className="nav_container text-white" collapseOnSelect expand="lg">
      <Container className="nav_size" fluid>
        <Navbar.Brand as={Link} to="/" className="weto">
          Weto
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/crew">
              CREW
            </Nav.Link>
            <Nav.Link as={Link} to="/challenge">
              CHALLENGE
            </Nav.Link>
          </Nav>
          <Nav>
            {sessionStorage.id == undefined ? (
              ''
            ) : (
              <Nav.Link as={Link} to="/mypage">
                MY PAGE
              </Nav.Link>
            )}
            {sessionStorage.id == undefined ? (
              <Nav.Link as={Link} to="/login">
                LOGIN
              </Nav.Link>
            ) : (
              <Nav.Link onClick={() => logout()}>LOGOUT</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
