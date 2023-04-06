import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Modal, Form, Table } from "react-bootstrap";

export default function PostIndex() {
  const [posts, setPosts] = useState([]);
  const [updatePost, setUpdatePost] = useState({});
  const [showUpdateModal, setShowUpdateModal] = useState(false);



  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:8000/api/posts");
      setPosts(response.data.posts.data);
      console.log(response.data.posts.data);
    }
    fetchData();
  }, []);

  // modal update post
  const handleShowUpdateModal = (post) => {
    setUpdatePost(post);
    setShowUpdateModal(true);
  };


  // update post
  const handleUpdatePost = async (post) => {
    try {
      await axios.put(`http://localhost:8000/api/posts/${post.id}`, post, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const updatedPosts = posts.map((p) => (p.id === post.id ? post : p));
      setPosts(updatedPosts);
      setShowUpdateModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  
  

//  delete Post
  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:8000/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      //mengupdate state
      const newPosts = posts.filter((post) => post.id !== postId);
      setPosts(newPosts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Container className="mt-3">
        <Button href="/posts/create" variant="dark" className="mb-3">
          Create Post
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="w-20">Title</th>
              <th className="w-50">Body</th>
              <th className="w-30">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td>
                  <Button href={`/post/${post.id}`} variant="dark" className="me-2">
                    Show
                  </Button>
                  <Button
                    variant="secondary"
                    className="me-2"
                    onClick={() => handleShowUpdateModal(post)}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDeletePost(post.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
  
        {/* modal update post */}
        <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={updatePost.title}
                  onChange={(e) =>
                    setUpdatePost({ ...updatePost, title: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Body</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={updatePost.body}
                  onChange={(e) =>
                    setUpdatePost({ ...updatePost, body: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleUpdatePost(updatePost)}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
  
}
