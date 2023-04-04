import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'

export default function PostCreate() {

// perpindahan halaman
  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/posts', {
        title: title,
        body: body,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(response.data);
      alert("Sukses membuat Post");
      setTitle(""); //kosongkan
      setBody(""); //kosongkan
      navigate('/posts'); //ke posts
    } catch (error) {
      console.error(error);
      alert("Failed to create post!");
    }
  };

  return (
    <div>
      <Container className="mt-3">
        <Button href="/posts" variant="dark" className="mb-3">Back to Posts</Button>
        <h2>Create Post</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" value={title} onChange={handleTitleChange} />
          </Form.Group>
          <Form.Group className="mt-2" controlId="formBody">
            <Form.Label>Body</Form.Label>
            <Form.Control as="textarea" placeholder="Enter body" value={body} onChange={handleBodyChange} />
          </Form.Group>
          <Button className="mt-3" variant="dark" type="submit">Create</Button>
        </Form>
      </Container>
    </div>
  );
}
