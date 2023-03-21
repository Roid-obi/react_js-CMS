import axios from "axios";
import { useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function PostCreate() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [validation, setValidation] = useState({});

    const navigate = useNavigate();

    const storePost = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8000/api/v1/posts', {
            title: title,
            content: content
        })
        .then(() => {
            navigate('/posts');
        })
        .catch((error) => {
            setValidation(error.response.data);
        })
        
    };
return (
    <Container className="mt-3">
        <Row>
            <Col md="{12}">
                <Card className="border-0 rounded shadow-sm">
                    <Card.Body>
                        {
                        validation.errors &&
                            <Alert variant="danger">
                                <ul class="mt-0 mb-0">
                                    { validation.errors.map((error, index) => (
                                        <li key={index}>{ `${error.param} : ${error.msg}` }</li>
                                    )) }
                                </ul>
                            </Alert>
                        }
                        <Form onSubmit={storePost}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="title">Title</Form.Label>
                                <Form.Control name="title" id="title" type="text" placeholder="Title" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="content">Content</Form.Label>
                                <Form.Control name="content" id="content" as="textarea" rows={3} placeholder="Content" />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Send
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
);
}

export default PostCreate;