import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Modal, Form } from 'react-bootstrap';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    // Fetch blog posts from the backend API
    fetch('/api/blogposts')
      .then(response => response.json())
      .then(data => setBlogPosts(data))
      .catch(error => console.error('Error fetching blog posts:', error));
  }, []);

  const handleShowModal = (post = null) => {
    setSelectedPost(post);
    setNewPost({ title: post?.title || '', content: post?.content || '' });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setNewPost({ title: '', content: '' });
    setSelectedPost(null);
    setShowModal(false);
  };

  const handleSavePost = () => {
    // Check if either title or content is empty
    if (!newPost.title.trim() || !newPost.content.trim()) {
      alert('Please enter both title and content before saving.');
      return;
    }
  
    const apiUrl = selectedPost ? `/api/blogposts/${selectedPost._id}` : '/api/blogposts';
    const method = selectedPost ? 'PUT' : 'POST';
  
    fetch(apiUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    })
      .then(response => response.json())
      .then(data => {
        if (selectedPost) {
          setBlogPosts(posts => posts.map(post => (post._id === data._id ? data : post)));
        } else {
          setBlogPosts(posts => [...posts, data]);
        }
        handleCloseModal();
      })
      .catch(error => console.error('Error saving blog post:', error));
  };

  const handleDeletePost = postId => {
    fetch(`/api/blogposts/${postId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        setBlogPosts(posts => posts.filter(post => post._id !== data._id));
      })
      .catch(error => console.error('Error deleting blog post:', error));
  };

  return (
    <Container className="mt-4">
      <h1>Blog Posts</h1>
      <Button variant="success" className="mb-3" onClick={() => handleShowModal()}>
        Create New Post
      </Button>
      <div className="row">
        {blogPosts.map(post => (
          <div key={post._id} className="col-md-4 mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content}</Card.Text>
                <Button variant="primary" onClick={() => handleShowModal(post)}>
                  Edit
                </Button>
                <Button variant="danger" className="ml-2" onClick={() => handleDeletePost(post._id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedPost ? 'Edit Post' : 'Create New Post'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={newPost.title}
                onChange={e => setNewPost({ ...newPost, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter content"
                value={newPost.content}
                onChange={e => setNewPost({ ...newPost, content: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSavePost}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Blog;
