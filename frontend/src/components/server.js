// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/travelblog', { useNewUrlParser: true, useUnifiedTopology: true });

// Define user schema and model
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Define blog post schema and model
const blogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  likes: { type: Number, default: 0 },
  comments: [{ text: String, author: String }],
  shares: { type: Number, default: 0 },
}, { timestamps: true });

// Model based on schema
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

app.use(bodyParser.json());

// Middleware to check if the request has a valid token for protected routes
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  });
};

// API endpoint for user registration
app.post('/api/register', [
  body('username').notEmpty(),
  body('password').isLength({ min: 6 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint for user login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ username }, 'your-secret-key');
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Protected API endpoint for user logout
app.post('/api/logout', authenticateToken, (req, res) => {
  const { user } = req;

  res.json({ message: 'Logout successful' });
});

// Protected API endpoint to create a new blog post
app.post('/api/blogposts', authenticateToken, [
  body('title').notEmpty(),
  body('content').notEmpty(),
  body('author').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, content, author } = req.body;

  try {
    const newBlogPost = new BlogPost({ title, content, author });
    await newBlogPost.save();
    res.json(newBlogPost);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Protected API endpoint to get all blog posts
app.get('/api/blogposts', authenticateToken, async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Like a blog post
app.post('/api/blogposts/:postId/like', async (req, res) => {
  const postId = req.params.postId;
  const post = await BlogPost.findById(postId);
  post.likes += 1;
  await post.save();
  res.json({ likes: post.likes });
});

// Comment on a blog post
app.post('/api/blogposts/:postId/comment', async (req, res) => {
  const postId = req.params.postId;
  const { text, author } = req.body;
  const post = await BlogPost.findById(postId);
  post.comments.push({ text, author });
  await post.save();
  res.json(post);
});

// Share a blog post
app.post('/api/blogposts/:postId/share', async (req, res) => {
  const postId = req.params.postId;
  const post = await BlogPost.findById(postId);
  post.shares += 1;
  await post.save();
  res.json({ shares: post.shares });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
