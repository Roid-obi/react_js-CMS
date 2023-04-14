import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import "./Profile.css";
import Loading from "./../Components/Loading";

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:8000/api/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProfileData(response.data.user);
    }
    fetchData();
  }, []);

  async function handleEditSubmit() {
    try {
      await axios.put(
        "http://localhost:8000/api/profile",
        { name: newName, email: newEmail },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setShowEditModal(false);
      setProfileData((prevState) => ({ ...prevState, name: newName, email: newEmail }));
      setNewName("");
      setNewEmail("");
    } catch (error) {
      console.error(error);
    }
  }

  if (!profileData) {
    return <Loading />;
  }

  return (
    <Container className="profile-container">
      <Row>
        <Col>
          <Card className="profile-card">
            <Card.Body>
              <Card.Title className="profile-name">{profileData.name}</Card.Title>
              <Card.Text className="profile-email">{profileData.email}</Card.Text>
              <Button
                className="btun-edit"
                onClick={() => {
                  setShowEditModal(true);
                  setNewName(profileData.name);
                  setNewEmail(profileData.email);
                }}
                variant="dark"
                size=""
              >
                Edit
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>New Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your new name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mt-2" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
