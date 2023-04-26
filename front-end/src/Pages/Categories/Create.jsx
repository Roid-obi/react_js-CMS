import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'

export default function CategoryCreate() {

  // perpindahan halaman
  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/category/create', {
        name: name,
        description: description,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(response.data);
      alert("Sukses membuat Category");
      setName(""); //kosongkan
      setDescription(""); //kosongkan
      navigate('/categories'); //ke categories
    } catch (error) {
      console.error(error);
      alert("Gagal membuat Category!");
    }
  };

  return (
    <div>
      <Container className="mt-3">
        <Button href="/categories" variant="dark" className="mb-3">Kembali ke Categories</Button>
        <h2>Buat Category</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Nama</Form.Label>
            <Form.Control type="text" placeholder="Masukkan Nama Category" value={name} onChange={handleNameChange} />
          </Form.Group>
          <Form.Group className="mt-2" controlId="formDescription">
            <Form.Label>Deskripsi</Form.Label>
            <Form.Control as="textarea" placeholder="Masukkan Deskripsi Category" value={description} onChange={handleDescriptionChange} />
          </Form.Group>
          <Button className="mt-3" variant="dark" type="submit">Buat</Button>
        </Form>
      </Container>
    </div>
  );
}
