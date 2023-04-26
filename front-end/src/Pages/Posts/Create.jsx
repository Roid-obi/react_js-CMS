import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function PostCreate() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isPinned, setIsPinned] = useState(false);


  useEffect(() => {
    const fetchTags = async () => {
      const response = await axios.get("http://localhost:8000/api/tag");
      setTags(response.data.data);
    };
    fetchTags();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get("http://localhost:8000/api/category");
      setCategories(response.data.data);
    };
    fetchCategories();
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/posts",
        {
          title: title,
          body: body,
          tags: selectedTags,
          categories: selectedCategories,
          is_pinned: isPinned,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      alert("Sukses membuat Post");
      setTitle("");
      setBody("");
      setSelectedTags([]);
      setSelectedCategories([]);
      navigate("/postIndex");
    } catch (error) {
      console.error(error);
      alert("Failed to create post!");
    }
  };

  return (
    <div>
      <Container className="mt-3">
        <Button href="/postIndex" variant="dark" className="mb-3">
          Back to Posts
        </Button>
        <h2>Create Post</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={handleTitleChange}
            />
          </Form.Group>
          <Form.Group className="mt-2" controlId="formBody">
            <Form.Label>Body</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter body"
              value={body}
              onChange={handleBodyChange}
            />
          </Form.Group>
          <Form.Group className="mt-2" controlId="formTags">
            {/* checkbox tag */}
          <Form.Label>Tags</Form.Label>
          {tags.map((tag) => (
            <Form.Check
              key={tag.id}
              type="checkbox"
              label={tag.name}
              value={tag.id}
              onChange={(event) => {
                const tagId = parseInt(event.target.value);
                if (event.target.checked) {
                  setSelectedTags([...selectedTags, tagId]);
                } else {
                  setSelectedTags(selectedTags.filter((id) => id !== tagId));
                }
              }}
              checked={selectedTags.includes(tag.id)}
            />
          ))}
        </Form.Group>
        <Form.Group className="mt-2" controlId="formCategories">
            {/* checkbox Category */}
          <Form.Label>Categories</Form.Label>
          {categories.map((category) => (
            <Form.Check
              key={category.id}
              type="checkbox"
              label={category.name}
              value={category.id}
              onChange={(event) => {
                const categoryId = parseInt(event.target.value);
                if (event.target.checked) {
                  setSelectedCategories([...selectedCategories, categoryId]);
                } else {
                  setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
                }
              }}
              checked={selectedCategories.includes(category.id)}
            />
          ))}
        </Form.Group>
        <Form.Group controlId="formPin" className="mt-3">
          <Form.Label>Pin</Form.Label>
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Toggle this switch"
            checked={isPinned}
            onChange={(e) => setIsPinned(e.target.checked)}
          />
        </Form.Group>


          <Button className="mt-3" variant="dark" type="submit">
            Create
          </Button
>
        </Form>
      </Container>
    </div>
  );
}
