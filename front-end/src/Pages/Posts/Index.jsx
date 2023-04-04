import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

export default function PostIndex() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:8000/api/posts');
      setPosts(response.data.posts.data);
      console.log(response.data.posts.data);
    }
    fetchData();
  }, []);
  
  return (
    <div>
      <Container className="mt-3">
        <Button href="/posts/create" variant="dark" className="mb-3">Create Post</Button>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {posts.map((post, index) => (
            <Col key={post.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>
                    {post.body}
                  </Card.Text>
                  <Button href={`/post/${post.id}`} variant="dark">Show</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
