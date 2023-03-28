import { Container, Nav, Navbar } from "react-bootstrap"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import '../App.css'
import Home from './../Pages/Home'
import PostIndex from './../Pages/Posts/Index'
import PostCreate from './../Pages/Posts/Create'
import PostShow from './../Pages/Posts/Show'
import ProtectedRoute from "../Routes/ProtectedRoute"
import Login from "../Pages/Login"
import axios from 'axios'

export default function NavbarX() {
  const token = localStorage.getItem('token')

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      const response = axios.post('http://localhost:8000/api/logout',token)
      localStorage.removeItem('token')
    } catch (error) {
      console.log(error)
    }
  }
    return (
        <div>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">React.JS</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Item>
                  <Nav.Link href="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/posts">Posts</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href='/login' className={token ? 'd-none' : ''}>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href='/logout' className={token ? '' : 'd-none'} onClick={handleLogout} >Logout</Nav.Link>
                </Nav.Item>
              </Nav>
            </Container>
          </Navbar>
    
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/logout" element={<Home />} />
            <Route path="/posts" element={<PostIndex />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/posts/create" element={<PostCreate />} exact/>
            </Route>
            <Route path="/post/:id" element={<PostShow />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<p>nothin here</p>} />
          </Routes>
        </Router>
        </div>
        )
}