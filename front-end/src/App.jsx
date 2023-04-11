import { Container, Nav, Navbar } from "react-bootstrap"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import PostIndex from './Pages/Posts/Index'
import PostCreate from './Pages/Posts/Create'
import PostShow from './Pages/Posts/Show'
import ProtectedRoute from "./Routes/ProtectedRoute"
import Login from "./Pages/Login"
import axios from 'axios'
import ResetPassword from "./Pages/ResetPW"
import Profile from "./Pages/Profile"
import Posts from "./Pages/Posts/Posts"
import Tags from "./Pages/Tags/index"
import TagCreate from "./Pages/Tags/Create"
import PostByTag from "./Pages/Posts/PostTag"

function App() {
  const token = localStorage.getItem('token')
// menghapus token
  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      const response = axios.post('http://localhost:8000/api/logout',token)
      localStorage.removeItem('token')
      window.location.reload(); // memuat ulang halaman
    } catch (error) {
      console.log(error)
    }
  }

    return (
        <div>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">Roid.Dev</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Item>
                  <Nav.Link href="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/Profile">Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/posts">Posts</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/postIndex">PostIndex</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/Tags">Tags</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href='/login' className={token ? 'd-none' : 'text-success'}>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href='/logout' className={token ? 'text-danger' : 'd-none'} onClick={handleLogout} >Logout</Nav.Link>
                </Nav.Item>
              </Nav>
            </Container>
          </Navbar>
    
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/logout" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path="/postIndex" element={<PostIndex />} />
            <Route path="/Tags" element={<Tags />} />
            <Route path="/posts" element={<Posts />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/posts/create" element={<PostCreate />} exact/>
              <Route path="/tags/create" element={<TagCreate />} exact/>
              <Route path="/posts/tag/:tag" element={<PostByTag />} exact/>
            </Route>
            <Route path="/post/:id" element={<PostShow />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<p>nothin here</p>} />
          </Routes>
        </Router>
        </div>
        )
}

export default App;