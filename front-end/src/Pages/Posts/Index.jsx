import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";

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
            <Table className="shadow-sm" striped bordered size="md">
            <thead>
                <tr>
                <th width='5%'>No.</th>
                <th>Title</th>
                <th>Content</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((post, index) => (
                <tr key={post.id}>
                    <td>{index + 1}</td>
                    <td>{post.title}</td>
                    <td>{post.body}</td>
                    <td>
                        <a href={`/post/${post.id}`}>Show</a>
                    </td>
                </tr>
                ))}
            </tbody>
            </Table>
        </Container>
    </div>
    );
}
