// Itinerary.js

import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Modal, Form } from 'react-bootstrap';

const Itinerary = () => {
  const [itineraries, setItineraries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newItinerary, setNewItinerary] = useState({ title: '', description: '' });
  const [selectedItinerary, setSelectedItinerary] = useState(null);

  useEffect(() => {
    // Fetch itineraries from the backend API
    fetch('/api/itineraries')
      .then(response => response.json())
      .then(data => setItineraries(data))
      .catch(error => console.error('Error fetching itineraries:', error));
  }, []);

  const handleShowModal = (itinerary = null) => {
    setSelectedItinerary(itinerary);
    setNewItinerary({ title: itinerary?.title || '', description: itinerary?.description || '' });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItinerary(null);
  };

  const handleSaveItinerary = () => {
    // Use the selectedItinerary to determine whether to create or update
    const apiUrl = selectedItinerary ? `/api/itineraries/${selectedItinerary._id}` : '/api/itineraries';

    const method = selectedItinerary ? 'PUT' : 'POST';

    fetch(apiUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItinerary),
    })
      .then(response => response.json())
      .then(data => {
        // Update the state with the new or updated itinerary
        if (selectedItinerary) {
          setItineraries(itins => itins.map(itin => (itin._id === data._id ? data : itin)));
        } else {
          setItineraries(itins => [...itins, data]);
        }

        // Close the modal
        handleCloseModal();
      })
      .catch(error => console.error('Error saving itinerary:', error));
  };

  const handleDeleteItinerary = itineraryId => {
    // Send a request to delete the itinerary
    fetch(`/api/itineraries/${itineraryId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        // Remove the deleted itinerary from the state
        setItineraries(itins => itins.filter(itin => itin._id !== data._id));
      })
      .catch(error => console.error('Error deleting itinerary:', error));
  };

  return (
    <Container className="mt-4">
      <h1>Itineraries</h1>
      <Button variant="success" className="mb-3" onClick={() => handleShowModal()}>
        Create New Itinerary
      </Button>
      <div className="row">
        {itineraries.map(itinerary => (
          <div key={itinerary._id} className="col-md-4 mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{itinerary.title}</Card.Title>
                <Card.Text>{itinerary.description}</Card.Text>
                <Button variant="primary" onClick={() => handleShowModal(itinerary)}>
                  Edit
                </Button>
                <Button variant="danger" className="ml-2" onClick={() => handleDeleteItinerary(itinerary._id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Modal for creating/editing itinerary */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedItinerary ? 'Edit Itinerary' : 'Create New Itinerary'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={newItinerary.title}
                onChange={e => setNewItinerary({ ...newItinerary, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={newItinerary.description}
                onChange={e => setNewItinerary({ ...newItinerary, description: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveItinerary}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Itinerary;
