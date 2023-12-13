// BlogList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const BlogList = ({ blogPosts, setBlogPosts, onDeletePost, onLikePost, onCommentPost }) => {
  // State for handling loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get('/api/blogposts')
      .then((response) => {
        setBlogPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching blog posts:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setBlogPosts]);


  if (loading) {
    return <p>Loading blog posts...</p>;
  }

  const handleLike = (postId) => {
    axios.post(`/api/blogposts/${postId}/like`).then((response) => {
      setBlogPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, likes: response.data.likes } : post
        )
      );
    });
  };

  const handleComment = (postId, comment) => {
    axios.post(`/api/blogposts/${postId}/comment`, comment).then((response) => {
      setBlogPosts(response.data);
    });
  };

  const handleShare = (postId) => {
    axios.post(`/api/blogposts/${postId}/share`).then((response) => {
      setBlogPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, shares: response.data.shares } : post
        )
      );
    });
  };

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
            <p>Likes: {post.likes}</p>
            <button onClick={() => handleLike(post._id)}>Like</button>
            <p>Comments: {post.comments.length}</p>
            <button onClick={() => handleComment(post._id, { text: 'A great post!', author: 'Anonymous' })}>
              Comment
            </button>
            <p>Shares: {post.shares}</p>
            <button onClick={() => handleShare(post._id)}>Share</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
