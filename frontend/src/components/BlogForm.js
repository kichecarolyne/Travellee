import React, { useState } from 'react';

const BlogForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if title and content are not empty
    if (title.trim() === '' || content.trim() === '') {
      alert('Please enter both title and content for your blog post.');
      return;
    }

    // Create a new blog post object
    const newPost = {
      id: Date.now(),
      title,
      content,
      author: 'Anonymous',
    };

    onSubmit(newPost);

    setTitle('');
    setContent('');
  };

  return (
    <div>
      <h2>Create a New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BlogForm;
