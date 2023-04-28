import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Loading from './../../Components/Loading';
import './Show.css';
import Toast from 'react-bootstrap/Toast';

function PostShow() {
  const [post, setPost] = useState(null);
  const [comments, setComment] = useState([]);
  const [updateComment, setUpdateComment] = useState({});
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [text, setText] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // reply comment
  const [showReply, setShowReply] = useState(false);
  const handleCloseReply = () => setShowReply(false);
  const handleShowReply = () => setShowReply(true);
  const [parentId, setParentId] = useState();
  const [updateCommentReply, setUpdateCommentReply] = useState({});
  const [showUpdateModalReply, setShowUpdateModalReply] = useState(false);

  // kembali
  function goBack() {
    navigate(-1);
  }

  // toats
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);


  useEffect(() => {
    async function fetchPost() {
      const response = await axios.get(`http://localhost:8000/api/posts/${id}`);
      setPost(response.data.post);
      setComment(response.data.comment);
      console.log(response.data.post);
      console.log(response.data.comment);
    }
    fetchPost();
  }, [id]);


    // modal update comment
    const handleShowUpdateModal = (comment) => {
      setUpdateComment(comment);
      setShowUpdateModal(true);
    };
    
    // modal update comment Reply
    const handleShowUpdateModalReply = (reply) => {
      setUpdateCommentReply(reply);
      setShowUpdateModalReply(true);
    };

    // Set token autentikasi pada setiap request API
  axios.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );


  // komen
  const [commentContent, setCommentContent] = useState('');

  // event handler untuk mengirim komentar ke server
  async function handleSubmitComment(e) {
    e.preventDefault();
    try {
      // kirim data komentar ke server menggunakan API POST
      const response = await axios.post(
        `http://localhost:8000/api/post/${id}/comments`,
        { content: commentContent,
          parent_id: parentId,
        }
      );

      
      const responseComment = await axios.get(`http://localhost:8000/api/posts/${id}`);
      setComment(responseComment.data.comment);

      
      setCommentContent(''); // kosongkan input komentar setelah berhasil ditambahkan
      setShowA(true); // set state untuk menampilkan toast
      setShowReply(false);

      setTimeout(() => {
        setShowA(false);
      }, 3000); // menunda panggilan setShowA(false) selama ... detik

    } catch (error) {
      console.error(error);
      // tampilkan pesan kesalahan jika terjadi kesalahan saat mengirim komentar
      alert('Failed to add comment');
    }
  }

  // update comment
    const handleUpdateComment = async (comment) => {
      try {
        await axios.put(
          `http://localhost:8000/api/comment/${comment.id}`,
          comment,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const updatedComment = comments.map((c) => (c.id === comment.id ? comment : c));
        setComment(updatedComment);
        setShowUpdateModal(false);
      } catch (error) {
        console.log(error);
      }
    };

    // update comment reply
    const handleUpdateCommentReply = async (reply) => {
      try {
        await axios.put(
          `http://localhost:8000/api/comment/${reply.id}`,
          reply,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const updatedComment = comments.map((r) => (r.id === reply.id ? reply : r));
        setComment(updatedComment);
        setShowUpdateModalReply(false);
      } catch (error) {
        console.log(error);
      }
    };


    // delele comment
    async function handleDeleteComment(commentId) {
      try {
        await axios.delete(`http://localhost:8000/api/comment/${commentId}`);
        const response = await axios.get(`http://localhost:8000/api/posts/${id}`);
        setComment(response.data.comment);
      } catch (error) {
        console.error(error);
        alert('Failed to delete comment');
      }
    }


  return (
    <Container className="mt-4">
    {post ? (
      <>
      <Row>
        <Col md="12">
          <Card className="card-post px-5 ">
            <Card.Body>
                <div>
                    <small className="text-muted">{post.views}x ditonton</small>
                    <p className="text-muted float-end fs-6">Created by : <span className="fw-bold">{post.created_by.name}</span></p>
                </div>
                <div className="text-center mt-3 mb-5">
                <img src={post.image ? `http://127.0.0.1:8000/images/${[post.image]}` : `https://source.unsplash.com/800x500/?${post.body}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultImage; // Optional: Set a default image as fallback alt="Default Post Image" className="mb-4" 
                    }}
                      />
                  <p className="mb-0 fs-3 fw-bold">{post.title}</p>
                  <p>{post.body}</p>
                </div>
                {/* menampilkan daftar tag */}
                  <div className="hover__ text-muted float-start fs-6">
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
                  <small className="text-muted float-end">{post.created_at}</small>
                  
                    
            </Card.Body>
                    <button className="back btn btn-dark mb-4" onClick={goBack}>
                      Back
                    </button>
          </Card>
        </Col>
      </Row>

      {/* form untuk menambahkan komentar */}
      { token ? 
      <>
      {/* add comment */}
      <form className='mt-5' onSubmit={handleSubmitComment}>
        <div className="mb-3">
          <h4 className='ms-1'>Add Comment</h4>
          <textarea
            className="form-control"
            id="commentContent"
            rows="3"
            value={commentContent}
            
            onChange={(e) => setCommentContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" onClick={() => { setParentId(null); }} className="btn btn-dark">
          Submit
        </button>
      </form>
      </>
       :
      <>
        <h5 className="mt-5 ms-1">
          Login jika ingin komen
        </h5>
      </>
      }
      

{/* lihat comment */}
      <div className='mt-5'>
            <h2>Comments ( {comments.length} )</h2>
            {comments
            .filter((comment) => !comment.parent_id) //yang tidak ada parent_id
            .map((comment) => (
              <div key={comment.id}>
              <Card className="card-comment my-3">
                <Card.Body>
                  <Card.Title className='text-break'>{comment.user && comment.user.name}</Card.Title>
                  <Card.Text>{comment.content}</Card.Text>
                  <small className="text-muted">{comment.created_at_parse}</small>
                  <div className='float-end'>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className='me-2'
                    onClick={() => {
                    handleShowReply();
                    setParentId(comment.id);
                    }}
                  >
                    Reply
                  </Button>
                  <Button
                    className='me-2'
                    variant="outline-warning"
                    size="sm"
                    onClick={() => handleShowUpdateModal(comment)}
                  >
                    Edit
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDeleteComment(comment.id)}>
                    Delete
                  </Button>
                  </div>
                </Card.Body>
              </Card>
              {/* reply comment */}
              {comments
                  .filter((c) => c.parent_id === comment.id) //yang ada parent_id
                  .map((reply) => (
                    <Card
                      key={reply.id}
                      className="card-comment-reply my-3"
                    >
                      {/* <Card.Header>Reply Comments</Card.Header> */}
                      <Card.Body>
                        <Card.Title className='text-break'>{reply.user && reply.user.name}</Card.Title>
                        <Card.Text>{reply.content}</Card.Text>
                        <small className="text-muted">{reply.created_at_parse}</small>
                        <div className='float-end'>
                        <Button
                          className='me-2'
                          variant="outline-warning"
                          size="sm"
                          onClick={() => handleShowUpdateModalReply(reply)}
                        >
                          Edit
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => handleDeleteComment(reply.id)}>
                          Delete
                        </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
              </div>
            ))}

      </div>
      </>
      ) : (
        <Loading />
      )}

      {/* toast */}
      <Toast show={showA} className='toast' onClose={toggleShowA} style={{}}>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Info</strong>
          <small>Baru saja</small>
        </Toast.Header>
        <Toast.Body className='text-success'>Komentar Berhasil ditambahkan!</Toast.Body>
      </Toast>

      {/* modal reply comment */}
      <Modal show={showReply}>
        <Modal.Header closeButton>
          <Modal.Title>Add Reply</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                className="form-control"
                id="commentContent"
                rows="3"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseReply}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitComment}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

     {/* modal update comment */}
       <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={updateComment.content}
                  onChange={(e) =>
                    setUpdateComment({ ...updateComment, content: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
              Close
            </Button>
            <Button variant="warning" onClick={() => handleUpdateComment(updateComment)}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>

        {/* modal update comment reply */}
       <Modal show={showUpdateModalReply} onHide={() => setShowUpdateModalReply(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={updateCommentReply.content}
                  onChange={(e) =>
                    setUpdateCommentReply({ ...updateCommentReply, content: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowUpdateModalReply(false)}>
              Close
            </Button>
            <Button variant="warning" onClick={() => handleUpdateCommentReply(updateCommentReply)}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>


    </Container>
  );
}

export default PostShow;