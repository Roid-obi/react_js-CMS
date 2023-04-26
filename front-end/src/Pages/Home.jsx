import viteLogo from '/vite.svg';
import reactLogo from '/react.svg';
import { Card, Row, Col, Button, Container, Modal, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import './Home.css';

function Home() {
  // perpindahan halaman
  const navigate = useNavigate()

  

  // state
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const [profileData, setProfileData] = useState(null);
  const [isPasswordReset, setIsPasswordReset] = useState(true);

  
  const token = localStorage.getItem('token');

  // email
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
        setIsLoading(false);
        setShowModal(false);
        setIsPasswordReset(false); // set isPasswordReset true saat berhasil
      })
      .catch(error => {
        console.log(error.response.data);
        alert(error.response.data.message);
      });
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md="{12}">
        {isPasswordReset ? (
          <Card className="cardhome">
            <Card.Body className="chome p-4">
              <img src={viteLogo} className="logo" />
              <img src={reactLogo} className="logo react" />
              <h1>React.JS</h1>
              <p className="lead">Tutorial FullStack React.js oleh <strong>roidrobih@gmail.com</strong></p>
              <Button className='mt-2 me-1' href="https://github.com/Roid-obi/react_js-CMS" target="_blank" variant="dark" size="lg">Code</Button>
              {token ? (
              <Button className='cbu mt-2 me-1' onClick={() => {setShowModal(true), setEmail(profileData.email)}} variant="dark" size="lg">Reset Password</Button>
              ) : '' }
              {token ?
                <Button className='cbu mt-2' href='/posts' variant="dark" size="lg">Get to Posts</Button>
                :
                <Button className='cbu mt-2' href='/login' variant='dark' size="lg">Login</Button>
              }
            </Card.Body>
          </Card>
          ) : (
            <Card className='cardhome'>
              <Card.Header className='bg-dark text-white'>
                Info
              </Card.Header>
              <Card.Body>
                <h5>Cek email anda, Coba Kirim ulang jika tidak ada</h5>
                <span className='btn btn-secondary mt-2' onClick={()=> setShowModal(true)}>Kirim Ulang</span>
              </Card.Body>
            </Card>
            )}
        </Col>
      </Row>


      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEmail">
              <Form.Label>Confirm Email</Form.Label>
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
