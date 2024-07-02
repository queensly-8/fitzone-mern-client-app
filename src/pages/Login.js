import React, { useState, useEffect, useContext } from "react";
import './index.css';
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../images/hustle2.png";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "./../UserContext";

const Login = () => {
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(false); // Initialize with false

    const navigate = useNavigate();

    useEffect(() => {
        // Enable submit button when both email and password are not empty
        setIsActive(email !== '' && password !== '');
    }, [email, password]);


    console.log("API_URL:", process.env.REACT_APP_API_URL)
    const authenticate = (e) => {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
            
            method: 'POST', // Use POST for sending sensitive data
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            if (typeof data.access !== "undefined") {
                localStorage.setItem('token', data.access);
                retrieveUserDetails(data.access);

                Swal.fire({
                    title: "Login Successful",
                    icon: "success",
                    text: "Welcome to FitZone!"
                }).then(() => {
                    navigate('/tracker'); // Navigate to tracker page after successful login
                });

            } else if (data.message === "No email found") {
                Swal.fire({
                    title: "No email found",
                    icon: "error",
                    text: "Email does not exist"
                });

            } else {
                Swal.fire({
                    title: "Authentication Failed",
                    icon: "error",
                    text: "Check your login details and try again"
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Something went wrong. Please try again later."
            });
        });

        // Clear input fields after submission
        setEmail('');
        setPassword('');
    }

    const retrieveUserDetails = (token) => {
        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setUser({
                id: data._id,
                isAdmin: data.isAdmin
            });
        })
        .catch(error => {
            console.error('Error fetching user details:', error);
        });
    }

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
                        <Link to="/">Home</Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="container1">
                <div className="header">
                    <div className="text">Login</div>
                    <div className="create">Don't have an account yet? <Link to="/register">Create Now</Link></div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="submit-container">
                    <button className="submit" onClick={authenticate} disabled={!isActive}>
                        Login
                    </button>
                </div>
            </div>
        </>
    )
}

export default Login;
