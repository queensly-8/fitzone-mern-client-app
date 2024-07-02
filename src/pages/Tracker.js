import React, { useState } from "react";
import './index.css';
import { Link } from "react-router-dom";
import { Card, Button, Modal, Form , Navbar, Container, Nav } from "react-bootstrap";
import im from "../images/avatar.png"
import logo from "../images/hustle2.png"
import CardPending from "../components/Card"
import AddWorkout from "../components/AddWorkout"
import CardCompleted from "../components/Completed";
import Name from '../components/LoggedOn'



const Tracker = () => {
  const [modalShow, setModalShow] = useState(false);
  const [activeTab, setActiveTab] = useState("#first");

  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  return (
    <>
      <Navbar className="navtracker" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="100"
              height="100"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Link to="/logout">Logout</Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section className="section main-banner" id="top" data-section="section1">
        <div className="container-fluid" id="tracker">
          <div className="row" id="landing-content">
            <div className="col-md-12 text-light text-center">
              <div className="profile-container">
                <img src={im} alt="Profile" className="profile-image" />
                <Name />
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="d-flex justify-content-center col-md-12 text-light text-center">
              <Card>
                <Card.Header>
                  <Nav variant="tabs" defaultActiveKey="#first" onSelect={handleTabSelect}>
                    <Nav.Item>
                      <Nav.Link eventKey="#add">Add Exercise</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="#pending">Pending</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="#comp">
                        Completed
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Header>
                <Card.Body>
                  {/* Content for the Active tab */}
                  <div id="add" style={{ display: activeTab === "#add" ? 'block' : 'none' }}>
                    <AddWorkout />
                  </div>
                  {/* Content for the Link tab */}
                  <div id="pending" style={{ display: activeTab === "#pending" ? 'block' : 'none' }}>
                  <CardPending />
                  </div>
                  {/* Content for the Disabled tab */}
                  <div id="comp" style={{ display: activeTab === "#comp" ? 'block' : 'none' }}>
                  <CardCompleted />
                  </div>
                </Card.Body>
              </Card>
              {/* <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              /> */}
              <br />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Tracker;
