// BlogPage.js
import React, { useState } from 'react';
import BlogForm from './BlogForm';
import BlogList from './BlogList';
import Login from './Login';
import Register from './Register';


const BlogPage = () => {
  // State for user authentication
  const [user, setUser] = useState(null);

  // State for blog posts
  const [blogPosts, setBlogPosts] = useState([
    // Your existing blog post data
    // { id: 1, title: '...', content: '...', author: '...' },
    // { id: 2, title: '...', content: '...', author: '...' },
    // ...
  ]);

  // Function to handle user login
  const handleLogin = (credentials) => {
    // Placeholder logic assuming successful login:
    setUser({ username: credentials.username });
  };

  // Function to handle user registration
  const handleRegister = (userData) => {
    // Placeholder logic assuming successful registration:
    setUser({ username: userData.username });
  };

  // Function to handle adding a new blog post
  const handleAddPost = (newPost) => {
    // Placeholder logic assuming successful addition:
    setBlogPosts((prevPosts) => [...prevPosts, newPost]);
  };

  // Function to handle deleting a blog post
  const handleDeletePost = (postId) => {
    // Placeholder logic assuming successful deletion:
    setBlogPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  // Render the BlogPage component
  return (
    <div>
      <h1>Travel Blog</h1>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <button onClick={() => setUser(null)}>Logout</button>
          <BlogForm onSubmit={handleAddPost} />
          <BlogList
            blogPosts={blogPosts}
            onDeletePost={handleDeletePost}
          />
        </div>
      ) : (
        <div>
          <p>Please log in or register to access the blog.</p>
          <Login onSubmit={handleLogin} />
          <Register onSubmit={handleRegister} />
        </div>
      )}
    </div>
  );
};

export default BlogPage;
