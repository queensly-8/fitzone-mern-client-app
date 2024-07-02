import React, { useContext, useState, useEffect } from "react";
import UserContext from "../UserContext";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../images/hustle2.png"
import './index.css';
import { Link } from "react-router-dom";


const Register = ()=>{
    const {user} = useContext(UserContext);
    const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [mobileNo, setMobileNo] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

    const [isActive, setIsActive] = useState('');

    function registerUser(e){
		//Prevents page redirection via form submission
		e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

		fetch(`${process.env.REACT_APP_API_URL}/users/register`,{
			method: 'POST',
			headers: {
				"Content-Type": "Application/json"
			},
			body: JSON.stringify({
				firstName,
				lastName,
				email,
				mobileNo,
				password
			})
		})
		.then(res => res.json())
		.then(data => {
			//data is the response of the api/server after it's been process as JS object through our res.json() method.
			console.log(data);

			if(data.message === "User registered successfully"){
				setFirstName('');
				setLastName('');
				setEmail('');
				setMobileNo('');
				setPassword('');
				setConfirmPassword('');

				alert("Registration Successful")
			}
			else if(data.message === "Invalid email format"){
				alert("Email is invalid");
			}
			else if(data.message === "Mobile number is invalid"){
				alert("Mobile number is invalid");
			}
			else if(data.message === "Password must be atleast 8 characters long"){
				alert("Password must be at least 8 characters long");
			}
			else{
				alert("Something went wrong");
			}
		}) 
	}

	useEffect(()=> {
		if((firstName !== "" && lastName !== "" && email !== "" && mobileNo !== "" && password !== "" && confirmPassword !== "" ) && (password === confirmPassword) && mobileNo.length === 11){

			setIsActive(true)
		} else {
			setIsActive(false)
		}
	}, [firstName, lastName, email, mobileNo, password, confirmPassword])

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
        <form onSubmit={registerUser}>
            <div className="header">
                <div className="text">Register</div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                </div>
                <div className="input">
                    <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required />
                </div>
                <div className="input">
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="input">
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <div className="input">
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                </div>
                <div className="input">
                    <input type="text" placeholder="Mobile" value={mobileNo} onChange={e => setMobileNo(e.target.value)} required />
                </div>
            </div>
            <div className="note">
                <span>Already have an account?</span>
                <Link className="register" to="/login">Login Here</Link>
            </div>
            <div className="submit-container">
                <button type="submit" className="btn" disabled={!isActive}>Register</button>
            </div>
        </form>
    </div>
	</>
);
};

export default Register;