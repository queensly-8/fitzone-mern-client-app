import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav} from 'react-bootstrap';
import './index.css'; // Ensure you have this CSS file linked properly
import im from '../images/hustle.png'
import Login from "../../src/pages/Login"

const Landing = () => {
    return (
        <>
        <section className="section main-banner" id="top" data-section="section1">

           <div className="container-fluid" id="landing">
    <Navbar className="navbar" id="transparentbg">
        <Container >
          <Navbar.Brand href="#home">
            <img
              src={im}
              width="200"
              height="200"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Nav className="navlink">
            <Link as={Nav.Link} className='nav-link' to="/login" >Login</Link>
            <Link as={Nav.Link} className='nav-link' to="/register">Register</Link>
          </Nav>
        </Container>
      </Navbar>

                    <div className="row" id="landing-content">
                        <div className="col-md-6 text-start text-light">
                            <h1 id="title" className="text">Achieve your health goals effortlessly<br /> with our all-in-one fitness tracker,<br /> designed to monitor your active lifestyle.</h1>
                            <button id="base" className="btn btn-dark mt-5">Start Working Out</button>
                        </div>
                        <div className="col-md-6 text-start text-light">
                            <h1 id="title" className="text"></h1>
                        </div>
                    </div>
                </div>
            </section>

  <footer class="footer">
      <div class="container">
          <div class="row">
              <div class="col-md-12">
                  <p>&copy; 2020 by FitZone | Design: By Des</p>
              </div>
          </div>
      </div>
  </footer>
        </>
    );
};

export default Landing;
