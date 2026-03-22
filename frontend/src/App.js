import React, { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch('http://localhost:8081/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(() => setMessage('Chua ket noi duoc backend'));
  };

  const addUser = () => {
    fetch('http://localhost:8081/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    })
      .then(() => {
        setMessage('Them user thanh cong!');
        setName('');
        setEmail('');
        fetchUsers();
      });
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1>React + Spring Boot + PostgreSQL</h1>

      <div style={{ marginBottom: '20px' }}>
        <h2>Them user moi</h2>
        <input
          placeholder="Ten"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <button onClick={addUser} style={{ padding: '8px 16px' }}>
          Them
        </button>
        {message && <p style={{ color: 'green' }}>{message}</p>}
      </div>

      <h2>Danh sach users</h2>
      {users.length === 0 ? (
        <p>Chua co user nao</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr><th>ID</th><th>Ten</th><th>Email</th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;