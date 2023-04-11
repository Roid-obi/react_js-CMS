import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Modal, Form } from "react-bootstrap";
import defaultImage from "/../public/images/def.jpg";
import './Posts.css';


export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:8000/api/posts");
      setPosts(response.data.posts.data);
    }
    fetchData();
  }, []);

  return (
    <div>
       <header className="text-center my-5">
        <h1 style={{  }}>
          Welcome to Posts
        </h1>
      </header>
      <Container className="mt-3">
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {posts.map((post, index) => (
            <Col key={post.id}>
              <Card>
                {/* Menambahkan gambar default */}
                <Card.Img variant="top" src={defaultImage} />
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.body}</Card.Text>
                  <Card.Text>
                    <div className="hover__">
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
                    </div>
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
    </div>
  );
}
