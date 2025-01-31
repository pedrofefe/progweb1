import Container from 'react-bootstrap/Container' ;
import PessoaFormulario from './views/pessoas/PessoaFormulario';
import Pessoalista  from './views/pessoas/Pessoalista';
import Notfound from './Notfound';
import Home  from './Home';
import Row from 'react-bootstrap/Row' ;
import Col from 'react-bootstrap/Col' ;
import Nav from 'react-bootstrap/Nav' ;
import { NavLink } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingCart,faUserCircle} from '@fortawesome/free-solid-svg-icons'

import {Provider} from "react-redux";
import store from "./redux/store"

import logo from './logo.svg';
import './App.css';
import './Styles.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return(

    
    <div className="App">
      
      <Router>
      <div className="header">
      <Container>

        <Row>
          <Col xs lg="2">
          <img id="logo" alt="Logomarca" src={`${process.env.PUBLIC_URL}/img/logo.png`}/>
          </Col>
          <Col md="auto">
          <Nav>
            <Nav.Item>
              <Nav.Link href="/home"> Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/produtos"> Produtos</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/contato"> Contato</Nav.Link>
            </Nav.Item>
            </Nav>
            </Col>
          <Col xs lg="1">
            <Container>
              <Row>
                <Col>
                <FontAwesomeIcon className="shopping-cart" icon={faShoppingCart}/></Col>
              </Row>
              <Row>
                <Col>
                <span className= "shopping-count">0 itens</span></Col>
              </Row>
            </Container>
          </Col>
          <Col xs lg="1">
          <FontAwesomeIcon className="userlogin" icon={faUserCircle}/>
          </Col>
        
        </Row>
      </Container>
      </div>
    <Container>
      <Row>
          <Col xs={3} >
          <Nav className="flex-column">
              <Link to="/" className="bg-light-gray nav-link">Home</Link>
              <Link to="/pessoa/lista" className="bg-light-gray nav-link">Pessoa</Link>
          </Nav>
          </Col>
          <Col xs={9}>
            <Switch>
              <Route exact path ="/"><Home /></Route>
              <Route  path ="/pessoa/lista"><Pessoalista/></Route>
              <Route exact path ="/pessoa/formulario :id"><PessoaFormulario/></Route>
              <Route exact path ="/pessoa/formulario"><PessoaFormulario/></Route>
              <Route  path ="*"><Notfound/></Route>
            </Switch>
          </Col>
         </Row>
    </Container>
    <div className="bg-dark-gray">      
    <Container>
      <Row >
        <Col> Ecommerce Deficiantable © Todos os direitos reservados 2021 </Col>
      </Row>
      </Container>

    </div>


      </Router>
      </div>
  );
}

export default App;
