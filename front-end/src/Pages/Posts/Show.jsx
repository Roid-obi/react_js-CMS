import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Loading from './../../Components/Loading';
import './Show.css';
import Toast from 'react-bootstrap/Toast';

function PostShow() {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState([]);
  const [text, setText] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  // const userId = localStorage.getItem('user_id');
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


// lojik komen
const [commentContent, setCommentContent] = useState('');

// event handler untuk mengirim komentar ke server
async function handleSubmitComment(e) {
  e.preventDefault();
  try {
    // kirim data komentar ke server menggunakan API POST
    const response = await axios.post(
      `http://localhost:8000/api/post/${id}/comments`,
      { content: commentContent }
    );

    const responseComment = await axios.get(`http://localhost:8000/api/posts/${id}`);
    setComment(responseComment.data.comment)


    // perbarui state komentar dengan menambahkan komentar yang baru saja ditambahkan
    // setComment((prevComments) => [...prevComments, response.data]);
    
    setCommentContent(''); // kosongkan input komentar setelah berhasil ditambahkan
    setShowA(true); // set state untuk menampilkan toast
    // window.location.reload(); // memuat ulang halaman

  } catch (error) {
    console.error(error);
    // tampilkan pesan kesalahan jika terjadi kesalahan saat mengirim komentar
    alert('Failed to add comment');
  }
}

  return (
    <Container className="mt-4">
    {post ? (
      <>
      <Row>
        <Col md="12">
          <Card className="px-5 rounded shadow-sm">
            <Card.Body>
                <div>
                    <small className="text-muted">{post.views}x ditonton</small>
                    <p className="text-muted float-end fs-6">Created by : <span className="fw-bold">{post.created_by.name}</span></p>
                </div>
                <div className="text-center mt-3 mb-5">
                <img src="/../public/images/def.jpg" alt="Default Post Image" className="mb-4" />
                  <p className="mb-0 fs-3 fw-bold">{post.title}</p>
                  <p>{post.body}</p>
                </div>
                {/* menampilkan daftar tag */}
                  <div className="hover__ text-muted float-start fs-6">
                    Tag:
                    {post.tags.map((tag) => (
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
        <button type="submit" className="btn btn-dark">
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

      {/* toast */}
<Toast show={showA} onClose={toggleShowA} style={{position: 'fixed', top: '10px', right: '10px', zIndex: '9999'}}>
  <Toast.Header>
    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
    <strong className="me-auto">Info</strong>
    <small>Baru saja</small>
  </Toast.Header>
  <Toast.Body style={{backgroundColor: 'black', color: 'white'}}>Komentar Berhasil ditambahkan!</Toast.Body>
</Toast>

      

{/* lihat post */}
      <div className='mt-5'>
            <h2>Comments ( {comment.length} )</h2>
            {comment.map((comment) => (
              <Card key={comment.id} className="my-3">
                <Card.Body>
                  <Card.Title className='text-break'>{comment.user && comment.user.name}</Card.Title>
                  <Card.Text>{comment.content}</Card.Text>
                  <small className="text-muted">{comment.created_at_parse}</small>
                </Card.Body>
              </Card>
            ))}

      </div>
      </>
      ) : (
        <Loading />
      )}

    </Container>
  );
}

export default PostShow;