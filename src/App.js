import React from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';
import Tracker from './pages/Tracker';
import Logout from './pages/Logout';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Add '.js' extension
import { UserProvider } from './UserContext';
import { useState, useEffect } from 'react';

const App = () => {
    const [user, setUser] = useState({
        id: null,
        isAdmin: null
      })
    
      // Function for clearing localStorage on logout
      const unsetUser = () => {
        localStorage.clear()
      }

      useEffect(() => {
        console.log(user);
        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if(typeof data !== "undefined"){
              setUser({
                  id: data._id,
                  isAdmin: data.isAdmin
            })
          } else {
              setUser({
                  id:null,
                  isAdmin: null
              })
          }
        })
    
        console.log(localStorage);
      }, [user])
return (
  <UserProvider value={{user, setUser, unsetUser}}>
  <Router>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/logout" element={<Logout />} />

      </Routes>
  </Router>
  </UserProvider>
);
}

export default App;