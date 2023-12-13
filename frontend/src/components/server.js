const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// MongoDB connection for Products
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB schema for Products
const productSchema = new mongoose.Schema({
  name: String,
  ratings: [Number],
  comments: [
    {
      user: String,
      text: String,
    },
  ],
});

const Product = mongoose.model('Product', productSchema);

// MongoDB schema for Blog Posts
const blogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  likes: Number,
  comments: [
    {
      user: String,
      text: String,
    },
  ],
  shares: Number,
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// MongoDB connection for Users
mongoose.connect('mongodb+srv://new_user2:ojg9exOJ3lLV2ugV@cluster0.jxnz7i7.mongodb.net/Travellee', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB schema for Users
const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  phone: String,
  password: String,
  cpassword: String,
  tokens: [
    {
      token: String,
    },
  ],
});

const User = mongoose.model('User', userSchema);

// Configuration for JWT
const JWT_SECRET_KEY = 'my-secret-key';

// User registration
app.post('/api/register', async (req, res) => {
  try {
    const { email, name, phone, password, cpassword } = req.body;

    const emailExists = await User.exists({ email });
    const nameExists = await User.exists({ name });
    const phoneExists = await User.exists({ phone });

    if (emailExists || nameExists || phoneExists) {
      return res.status(401).json({ error: 'Email, Name, or Phone Number already exists' });
    }

    if (password !== cpassword) {
      return res.status(401).json({ error: 'Password Not Matching!' });
    }

    const hashpw = await bcrypt.hash(password, 10);
    const hashCpw = await bcrypt.hash(cpassword, 10);

    const user = new User({
      email,
      name,
      phone,
      password: hashpw,
      cpassword: hashCpw,
      tokens: [{ token: '' }],
    });

    await user.save();

    const token = jwt.sign({ email }, JWT_SECRET_KEY);
    user.tokens[0].token = token;
    await user.save();

    return res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' });
    }

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ email }, JWT_SECRET_KEY);
    user.tokens[0].token = token;
    await user.save();

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Protected API endpoint for user logout
app.post('/api/logout', async (req, res) => {
  try {
    const current_user = req.user;
    // Perform any additional logout logic if needed
    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Product rating endpoint
app.post('/api/products/:productId/rate', async (req, res) => {
  try {
    const { rating } = req.body;
    const { productId } = req.params;

    const product = await Product.findByIdAndUpdate(
      productId,
      { $push: { ratings: rating } },
      { new: true }
    );

    return res.status(200).json({ message: 'Rating added successfully', product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Product commenting endpoint
app.post('/api/products/:productId/comment', async (req, res) => {
  try {
    const { text } = req.body;
    const { productId } = req.params;
    const { user } = req.body;

    const product = await Product.findByIdAndUpdate(
      productId,
      { $push: { comments: { user, text } } },
      { new: true }
    );

    return res.status(200).json({ message: 'Comment added successfully', product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new blog post
app.post('/api/blogposts', async (req, res) => {
  try {
    const { title, content, author } = req.body;

    const newBlogPost = new BlogPost({
      title,
      content,
      author,
      likes: 0,
      comments: [],
      shares: 0,
    });

    await newBlogPost.save();

    return res.status(201).json({ message: 'Blog post created successfully', blogPost: newBlogPost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all blog posts
app.get('/api/blogposts', async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    return res.status(200).json(blogPosts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific blog post by ID
app.get('/api/blogposts/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const blogPost = await BlogPost.findById(postId);

    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    return res.status(200).json(blogPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a specific blog post by ID
app.put('/api/blogposts/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, content, author } = req.body;

    const updatedBlogPost = await BlogPost.findByIdAndUpdate(
      postId,
      { title, content, author },
      { new: true }
    );

    if (!updatedBlogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    return res.status(200).json({ message: 'Blog post updated successfully', blogPost: updatedBlogPost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a specific blog post by ID
app.delete('/api/blogposts/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const deletedBlogPost = await BlogPost.findByIdAndDelete(postId);

    if (!deletedBlogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    return res.status(200).json({ message: 'Blog post deleted successfully', blogPost: deletedBlogPost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
