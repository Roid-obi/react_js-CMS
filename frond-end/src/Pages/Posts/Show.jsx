import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Loading from './../../Components/Loading';
import './Show.css';

function PostShow() {
  const [post, setPost] = useState(null);
  // const [comment, setComment] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  useEffect(() => {
    async function fetchPost() {
      const response = await axios.get(`http://localhost:8000/api/posts/${id}`);
      setPost(response.data.post);
      // setComment(response.data.comment);
      console.log(response.data.post);
      console.log(response.data.comment);

    }
    fetchPost();
  }, [id]);
  return (
    <Container className="mt-3">
    {post ? (
      <>
      <Row>
        <Col md="12">
          <Card className="px-5 rounded shadow-sm">
            <Card.Body>
                <div>
                    <small className="text-muted">{post.views}x ditonton</small>
                    <p className="text-muted float-end fs-6">Created by : <span className="fw-bold">{post.user}</span></p>
                </div>
                <div className="text-center mt-3 mb-5">
                  <p className="mb-0 fs-3 fw-bold">{post.title}</p>
                  <p>{post.content}</p>
                </div>
                  <small className="text-muted float-end">{post.create_at}</small>
                    <span className='hover__' onClick={goBack}>
                      Back
                    </span>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* <div className='mt-2'>
            <h2>Comments ( {comment.length} )</h2>
              {comment.map((comment) => (
                <Card key={comment.id} className="my-3">
                  <Card.Body>
                    <Card.Title className='text-break'>{comment.user.name}</Card.Title>
                    <Card.Text>{comment.text}</Card.Text>
                    <small className="text-muted">{comment.created_at}</small>
                  </Card.Body>
                </Card>
              ))}
      </div> */}
      </>
      ) : (
        <Loading />
      )}

    </Container>
  );
}

export default PostShow;