import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import PostCreate from "./Pages/Posts/Create";
import PostIndex from "./Pages/Posts/Index";
import './App.css';
import PostShow from "./Pages/Posts/Show";

function App() {

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">React Vite JS</Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/posts">Posts</Nav.Link>
          </Nav.Item>
          </Nav>
        </Container>
      </Navbar>

    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/posts" element={<PostIndex />} />
        <Route path="/posts/create" element={<PostCreate />} />
        <Route path="/post/:id" element={<PostShow />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
