// BlogList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    // Fetch blog posts from the backend when the component mounts
    axios.get('/api/blogposts').then((response) => {
      setBlogPosts(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Travel Blog</h2>
      <ul>
        {blogPosts.map((post) => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>Author: {post.author}</p>
            <p>Date: {new Date(post.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
