import { Button, Card, Col, Container, Row, Modal, Form, Table } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Tags() {
    const [tags, setTags] = useState([]);
    const [updateTag, setUpdateTag] = useState({});
    const [showUpdateModal, setShowUpdateModal] = useState(false);
  
    useEffect(() => {
      axios
        .get('http://localhost:8000/api/tag')
        .then((response) => {
          const reversedTags = response.data.data.reverse(); //agar data yang terbaru ditaruh di paling atas
          setTags(reversedTags);
          console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

      // modal update tag
  const handleShowUpdateModal = (tag) => {
    setUpdateTag(tag);
    setShowUpdateModal(true);
  };

    // update tag
  const handleUpdateTag = async (tag) => {
    try {
      await axios.put(`http://localhost:8000/api/tag/update/${tag.id}`, tag, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const updatedTags = tags.map((t) => (t.id === tag.id ? tag : t));
      setTags(updatedTags);
      setShowUpdateModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  

  

// delete tag
const handleDeletePost = async (tagId) => {
    try {
      await axios.delete(`http://localhost:8000/api/tag/delete/${tagId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // update state
      const newTags = tags.filter((tag) => tag.id !== tagId);
      setTags(newTags);
    } catch (error) {
      console.log(error);
    }
  };
  
    return (
        <div>
        <Container className="mt-3">
          <Button href="/tags/create" variant="dark" className="mb-3">
            Create Tag
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="w-20">Name</th>
                <th className="w-50">Description</th>
                <th className="w-30">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tags.map((tag) => (
                <tr key={tag.id}>
                  <td>{tag.name}</td>
                  <td>{tag.description}</td>
                  <td>
                    <Button
                      variant="secondary"
                      className="me-2"
                      onClick={() => handleShowUpdateModal(tag)}
                    >
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDeletePost(tag.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>



          <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Update Tag</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={updateTag.name}
          onChange={(e) =>
            setUpdateTag({ ...updateTag, name: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={updateTag.description}
          onChange={(e) =>
            setUpdateTag({ ...updateTag, description: e.target.value })
          }
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
      Close
    </Button>
    <Button variant="primary" onClick={() => handleUpdateTag(updateTag)}>
      Update
    </Button>
  </Modal.Footer>
</Modal>



          </Container>
          </div>
    );
  }
  
  export default Tags;
  