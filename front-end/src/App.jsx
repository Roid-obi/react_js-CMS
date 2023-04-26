import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import PostIndex from './Pages/Posts/Index';
import PostCreate from './Pages/Posts/Create';
import PostShow from './Pages/Posts/Show';
import ProtectedRoute from "./Routes/ProtectedRoute";
import Login from "./Pages/Login";
import axios from 'axios';
import ResetPassword from "./Pages/ResetPW";
import Profile from "./Pages/Profile";
import Posts from "./Pages/Posts/Posts";
import Tags from "./Pages/Tags/index";
import TagCreate from "./Pages/Tags/Create";
import PostByTag from "./Pages/Posts/PostTag";
import Categories from "./Pages/Categories/index";
import CategoryCreate from "./Pages/Categories/Create";
import PostByCategory from "./Pages/Posts/PostCategory";

function App() {
  const token = localStorage.getItem('token');
  
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = axios.post('http://localhost:8000/api/logout',token);
      localStorage.removeItem('token');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Roid.Dev</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item>
                <Nav.Link href="/">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/posts">Posts</Nav.Link>
              </Nav.Item>
              
            </Nav>
            <Nav className="ms-auto">
              <NavDropdown title="Menu" id="basic-nav-dropdown" align="end">
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="/postIndex">PostIndex</NavDropdown.Item>
                  <NavDropdown.Item href="/tags">Tags</NavDropdown.Item>
                  <NavDropdown.Item href="/categories">Categories</NavDropdown.Item>
                  <NavDropdown.Divider />
                  {token ?
                    <NavDropdown.Item href="/logout" onClick={handleLogout}>Logout</NavDropdown.Item>
                    :
                    <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                  }
                </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Router>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/logout" element={<Home />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path="/posts" element={<Posts />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/postIndex" element={<PostIndex />} />
              <Route path="/posts/create" element={<PostCreate />} exact/>
              <Route path="/Tags" element={<Tags />} />
              <Route path="/Categories" element={<Categories />} />
              <Route path="/tags/create" element={<TagCreate />} exact/>
              <Route path="/categories/create" element={<CategoryCreate />} exact/>
              <Route path="/posts/tag/:tag" element={<PostByTag />} exact/>
              <Route path="/posts/category/:category" element={<PostByCategory />} exact/>
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