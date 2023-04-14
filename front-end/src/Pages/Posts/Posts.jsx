import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Modal, Form, Carousel } from "react-bootstrap";
import defaultImage from "/../public/images/def.jpg";
import './Posts.css';


export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [pinnedPosts, setPinnedPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:8000/api/posts");
      setPosts(response.data.posts.data);
      setPinnedPosts(response.data.posts.data.filter(post => post.is_pinned));
    }
    fetchData();
  }, []);

  return (
    <div>
      {pinnedPosts.length > 0 &&
        <Carousel fade>
          {pinnedPosts.map(post => (
            <Carousel.Item key={post.id}>
              <img
                className="d-block w-100"
                src={`https://source.unsplash.com/1800x600/?${post.body}`}
                alt={post.title}
              />
              <Carousel.Caption>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <Button href={`/post/${post.id}`} variant="dark" className="me-2">
                  Detail
                </Button>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      }
      <header className="text-center my-5">
        <h1 style={{  }}>
          Welcome to Posts
        </h1>
      </header>
      <Container className="mt-3 mb-5">
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {posts
          .filter((post) => !post.is_pinned) //yang tidak ada parent_id
          .map((post, index) => (
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
                          className="hover__ me-2"
                        >
                          #{tag.name}
                        </a>
                      ))}
                    </Card.Text>
                    <Button href={`/post/${post.id}`} variant="dark" className="me-2">
                      Detail
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
