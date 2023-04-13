import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row, Modal, Form } from "react-bootstrap";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import defaultImage from "/../public/images/def.jpg";
import './PostTag.css'

function PostByTag() {
  const [tags, setTags] = useState([]);
  const [posts, setPosts] = useState([]);
  const { tag } = useParams();

  useEffect(() => {
    // Memuat semua tag yang tersedia dari API
    axios.get('http://localhost:8000/api/tag')
      .then(response => {
        setTags(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // Memuat post berdasarkan tag yang dipilih dari API
    if (tag) {
      axios.get(`http://localhost:8000/api/posts/tag/${tag}`)
        .then(response => {
          setPosts(response.data.posts.data);
          console.log(response.data.posts.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [tag]);

  return (
    <div>
      <header className="text-center my-5">
      <h1>Tag: {tag}</h1>
      </header>
      {posts.length > 0 ? (
        <Container className="mt-3">
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {posts.map((post, index) => (
            <Col key={post.id}>
              <Card className="card-post">
                {/* Menambahkan gambar default */}
                <Card.Img variant="top" src={`https://source.unsplash.com/800x600/?${post.body}`} />
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.body}</Card.Text>
                  <Card.Text>
                  Tag: {post.tags.map((tag) => (
                        <a
                          href={`/posts/tag/${tag.name}`}
                          key={tag.id}
                          bg="secondary"
                          className="me-2"
                        >
                          #{tag.name}
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

export default PostByTag;
