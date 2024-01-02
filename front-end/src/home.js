import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    // Fetch users from backend and set them to the state
    // Example API call:
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleCreateUser = () => {
    // Send a POST request to backend to create a new user
    // Example API call:
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(response => response.json())
      .then(data => {
        setUsers(prevUsers => [...prevUsers, data]);
        setNewUser({
          username: '',
          name: '',
          email: '',
          phone: '',
          address: ''
        });
      })
      .catch(error => console.error(error));
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser(user);
  };

  const handleUpdateUser = () => {
    // Send a PUT request to backend to update the user
    // Example API call:
    fetch(`/api/users/${editingUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(response => response.json())
      .then(data => {
        setUsers(prevUsers => prevUsers.map(u => u.id === data.id ? data : u));
        setEditingUser(null);
        setNewUser({
          username: '',
          name: '',
          email: '',
          phone: '',
          address: ''
        });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteUser = (user) => {
    // Send a DELETE request to backend to delete the user
    // Example API call:
    fetch(`/api/users/${user.id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setUsers(prevUsers => prevUsers.filter(u => u.id !== user.id));
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>User Management Dashboard</h1>

      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.username})
            <button onClick={() => handleEditUser(user)}>Edit</button>
            <button onClick={() => handleDeleteUser(user)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Create User</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={newUser.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={newUser.phone}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={newUser.address}
            onChange={handleInputChange}
          />
        </label>
        <button type="button" onClick={handleCreateUser}>Create</button>
        {editingUser && (
          <button type="button" onClick={handleUpdateUser}>Update</button>
        )}
      </form>
    </div>
  );
};

export default Dashboard;
