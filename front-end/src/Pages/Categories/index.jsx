import { Button, Card, Col, Container, Row, Modal, Form, Table } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Categories() {
    const [categories, setCategories] = useState([]);
    const [updateCategory, setUpdateCategory] = useState({});
    const [showUpdateModal, setShowUpdateModal] = useState(false);
  
    useEffect(() => {
      axios
        .get('http://localhost:8000/api/category')
        .then((response) => {
          setCategories(response.data.data);
          console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

      // modal update tag
  const handleShowUpdateModal = (category) => {
    setUpdateCategory(category);
    setShowUpdateModal(true);
  };

    // update tag
  const handleUpdateCategory = async (category) => {
    try {
      await axios.put(`http://localhost:8000/api/category/update/${category.id}`, category, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const updatedCategories = categories.map((c) => (c.id === category.id ? category : c));
      setCategories(updatedCategories);
      setShowUpdateModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  

  

// delete category
const handleDeletePost = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:8000/api/category/delete/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // update state
      const newCategories = categories.filter((category) => category.id !== categoryId);
      setCategories(newCategories);
    } catch (error) {
      console.log(error);
    }
  };
  
    return (
        <div>
        <Container className="mt-3">
          <Button href="/categories/create" variant="dark" className="mb-3">
            Create Category
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
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    <Button
                      variant="secondary"
                      className="me-2"
                      onClick={() => handleShowUpdateModal(category)}
                    >
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDeletePost(category.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>



          <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Update Category</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={updateCategory.name}
          onChange={(e) =>
            setUpdateCategory({ ...updateCategory, name: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={updateCategory.description}
          onChange={(e) =>
            setUpdateCategory({ ...updateCategory, description: e.target.value })
          }
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
      Close
    </Button>
    <Button variant="primary" onClick={() => handleUpdateCategory(updateCategory)}>
      Update
    </Button>
  </Modal.Footer>
</Modal>



          </Container>
          </div>
    );
  }
  
  export default Categories;
  