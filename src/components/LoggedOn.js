import React, { useState, useEffect } from 'react';

const Name = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (!res.ok) {
          throw new Error("Error getting info");
        }
        return res.json();
      })
      .then(data => {
        setUser(data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setError(error.message);
      });
    }
  }, []); // Empty dependency array ensures this runs once after the initial render

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
      <h1 className="title profile-name text-dark">{user.firstName} {user.lastName}</h1>
  );
};

export default Name;
