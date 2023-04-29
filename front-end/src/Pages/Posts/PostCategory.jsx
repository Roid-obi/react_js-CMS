import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row, Modal, Form } from "react-bootstrap";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import defaultImage from "/../public/images/def.jpg";
import './PostCategory.css'

function PostByCategory() {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    // Memuat semua tag yang tersedia dari API
    axios.get('http://localhost:8000/api/category')
      .then(response => {
        setCategories(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // Memuat post berdasarkan tag yang dipilih dari API
    if (category) {
      axios.get(`http://localhost:8000/api/posts/category/${category}`)
        .then(response => {
          setPosts(response.data.posts.data);
          console.log(response.data.posts.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [category]);

  return (
    <div>
      <header className="text-center my-5">
      <h1>Category: {category}</h1>
      </header>
      {posts.length > 0 ? (
        <Container className="mt-3">
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {posts.map((post, index) => (
            <Col key={post.id}>
              <Card className="card-post">
                {/* Menambahkan gambar default */}
                <Card.Img
                  className="card-img-top"
                  variant="top"
                  src={post.image ? `http://127.0.0.1:8000/images/${[post.image]}` : `https://source.unsplash.com/800x600/?${post.body}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultImage; // Optional: Set a default image as fallback
                  }}
                />
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.body}</Card.Text>
                    <Card.Text>
                    Category: {post.categories.map((category) => (
                        <a
                          href={`/posts/category/${category.name}`}
                          key={category.id}
                          bg="secondary"
                          className="hover__ me-2"
                        >
                          {category.name}
                        </a>
                      ))}
                    </Card.Text>
                  <Button href={`/post/${post.id}`} variant="dark" className="me-2">
                    Show
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      ) : (
        <p className='text-center'>Loading..</p>
      )}
    </div>
  );
}

export default PostByCategory;
