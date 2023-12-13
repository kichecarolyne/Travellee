import React, { useState } from 'react';
import BlogForm from './BlogForm';
import BlogList from './BlogList';
import Login from './Login';


const BlogPage = () => {
  // State for user authentication
  const [user, setUser] = useState(null);

  // State for blog posts
  const [blogPosts, setBlogPosts] = useState([
    // Your existing blog post data
    // { id: 1, title: '...', content: '...', author: '...', likes: 0, comments: [] },
    // { id: 2, title: '...', content: '...', author: '...', likes: 0, comments: [] },
    // ...
  ]);

  // Function to handle user login
  const handleLogin = (credentials) => {
    // Placeholder logic assuming successful login:
    setUser({ username: credentials.username });
  };

  // Function to handle adding a new blog post
  const handleAddPost = (newPost) => {
    // Placeholder logic assuming successful addition:
    setBlogPosts((prevPosts) => [...prevPosts, { ...newPost, author: user.username, likes: 0, comments: [] }]);
  };

  // Function to handle deleting a blog post
  const handleDeletePost = (postId) => {
    // Placeholder logic assuming successful deletion:
    setBlogPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  // Function to handle liking a blog post
  const handleLikePost = (postId) => {
    // Placeholder logic assuming successful like:
    setBlogPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  // Function to handle commenting on a blog post
  const handleCommentPost = (postId, comment) => {
    // Placeholder logic assuming successful comment:
    setBlogPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );
  };

  // Render the BlogPage component
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Travel Blog</h1>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <button className="btn btn-danger" onClick={() => setUser(null)}>
            Logout
          </button>
          <BlogForm onSubmit={handleAddPost} />
          <BlogList
            blogPosts={blogPosts}
            onDeletePost={handleDeletePost}
            onLikePost={handleLikePost}
            onCommentPost={handleCommentPost}
          />
        </div>
      ) : (
        <div>
          <p>Please log in or register to access the blog.</p>
          <Login onSubmit={handleLogin} />
        </div>
      )}
    </div>
  );
};

export default BlogPage;