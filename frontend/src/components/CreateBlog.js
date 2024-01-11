// src/components/CreateBlog.js
import React, { useState } from 'react';

const CreateBlog = ({ onCreateBlog }) => {
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    author: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreate = () => {
    if (!blogData.title || !blogData.content || !blogData.author) {
      alert('Please fill in all fields');
      return;
    }

    onCreateBlog(blogData);

    setBlogData({
      title: '',
      content: '',
      author: '',
    });
  };

  return (
    <div>
      <h2>Create a Blog</h2>
      <form>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={blogData.title}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={blogData.content}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={blogData.author}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <button type="button" onClick={handleCreate} className="btn btn-primary">
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
