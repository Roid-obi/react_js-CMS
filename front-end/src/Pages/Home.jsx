import viteLogo from '/vite.svg';
import reactLogo from '/react.svg';
import { Card, Row, Col, Button, Container } from 'react-bootstrap';

function Home() {

  // style
  const contain = {
    backgroundColor: 'black',
    padding: '20px',
    borderRadius: '10px',
    // boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
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
                  <p class="lead">Tutorial FullStack React.js oleh <strong>roidrobih@gmail.com</strong></p>
                  <Button href="https://github.com/Roid-obi" target="_blank" variant="dark" size="lg">SELENGKAPNYA</Button>
                  <Button className='ms-2' href='/posts' variant="dark" size="lg">Get Started</Button>
                  </Card.Body>
              </Card>
          </Col>
      </Row>
  </Container>
    );
}

export default Home;