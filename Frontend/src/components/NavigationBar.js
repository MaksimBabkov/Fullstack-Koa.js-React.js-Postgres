import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    z-index: 2;
    background-color: black;
   }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #0db9be;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #0db9be;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;

export const NavigationBar = () => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand href="/">Загрузка файлов пользователя</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
     
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {/* <Nav.Item><Nav.Link href="/">Добавить пользователя</Nav.Link></Nav.Item> 
          <Nav.Item><Nav.Link href="/about">Получить файлы по email</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/CreateVideoimg">Все клиенты</Nav.Link></Nav.Item> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
)