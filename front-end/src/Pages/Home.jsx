import viteLogo from '/vite.svg';
import reactLogo from '/react.svg';
import { Card, Row, Col, Button, Container, Modal, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Home() {
  // perpindahan halaman
  const navigate = useNavigate()

  // state
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  // style
  const contain = {
    backgroundColor: 'black',
    padding: '20px',
    borderRadius: '10px',
  }
  const token = localStorage.getItem('token');

  // reset password function
  const handleResetPassword = () => {
    setIsLoading(true); // set isLoading true saat handleResetPassword dijalankan
    axios.post('http://localhost:8000/api/password/forgot', { email: email }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        // berhasil
        setIsLoading(false); // set isLoading false saat handleResetPassword berhasil
        navigate('/ResetPassword');
      })
      .catch(error => {
        console.log(error.response.data);
        alert(error.response.data.message);
      });
  }

  return (
    <Container style={contain} className="mt-5">
      <Row>
        <Col md="{12}">
          <Card className="border-0 rounded shadow-sm">
            <Card.Body className="p-4">
              <img src={viteLogo} className="logo" />
              <img src={reactLogo} className="logo react" />
              <h1>React.JS</h1>
              <p className="lead">Tutorial FullStack React.js oleh <strong>roidrobih@gmail.com</strong></p>
              <Button href="https://github.com/Roid-obi/react_js-CMS" target="_blank" variant="dark" size="lg">Code</Button>
              {token ? (
              <Button className='ms-2' onClick={() => setShowModal(true)} variant="dark" size="lg">Reset Password</Button>
              ) : '' }
              {token ?
                <Button className='ms-2' href='/posts' variant="dark" size="lg">Get to Posts</Button>
                :
                <Button className='ms-2' href='/login' variant='dark' size="lg">Login</Button>
              }
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="dark" onClick={handleResetPassword}>
            {isLoading ? 'Loading...' : 'Reset Password'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Home;
