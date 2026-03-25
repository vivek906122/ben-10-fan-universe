import express from 'express';
import fs from 'fs';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const usersFilePath = './users.json';

// Helper to read users
const readUsers = () => {
  if (!fs.existsSync(usersFilePath)) {
    return [];
  }
  const data = fs.readFileSync(usersFilePath, 'utf-8');
  return JSON.parse(data);
};

// Helper to write users
const writeUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Signup Endpoint
app.post('/api/signup', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const users = readUsers();

  const userExists = users.some(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ error: 'User already exists with this email' });
  }

  const newUser = { id: Date.now(), username, email, password };
  users.push(newUser);
  writeUsers(users);

  res.status(201).json({ message: 'User registered successfully', user: newUser });
});

// Login Endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const users = readUsers();
  
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // In a real app we would use JWT, but here we just return success
  res.status(200).json({ message: 'Login successful', user });
});

// Get User Count Endpoint
app.get('/api/users/count', (req, res) => {
  const users = readUsers();
  res.status(200).json({ count: users.length });
});

// Get All Users Endpoint (For admin debugging)
app.get('/api/users', (req, res) => {
  const users = readUsers();
  res.status(200).json(users);
});

app.listen(PORT, () => {
  console.log(`Backend Server running on http://localhost:${PORT}`);
});
