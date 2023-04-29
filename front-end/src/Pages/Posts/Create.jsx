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
  const [image, setImage] = useState(null); // state untuk menampung file gambar yang dipilih

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

  const handleImageChange = (event) => {
    setImage(event.target.files[0]); // set state dengan file yang dipilih oleh pengguna
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("body", body);
      // cek apakah image ada sebelum menambahkannya ke FormData
      if (image) {
        formData.append("image", image);
      } else {
        formData.append("image", "");
      }
  
      // Masukkan data tags, categories, dan is_pinned ke dalam FormData
      selectedTags.forEach((tagId) => {
        formData.append("tags[]", tagId);
      });
      selectedCategories.forEach((categoryId) => {
        formData.append("categories[]", categoryId);
      });
      formData.append("is_pinned", isPinned ? 1 : 0);
  
      const response = await axios.post(
        "http://localhost:8000/api/posts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      alert("Sukses membuat Post");
      setTitle("");
      setBody("");
      setSelectedTags([]);
      setSelectedCategories([]);
      setImage(null);
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
          <Form.Label>Categories</Form.Label>
          {categories.map((category) => (
            <Form.Check
              key={category.id}
              type="radio"
              label={category.name}
              value={category.id}
              onChange={(event) => {
                const categoryId = parseInt(event.target.value);
                if (event.target.checked) {
                  setSelectedCategories([categoryId]);
                } else {
                  setSelectedCategories([]);
                }
              }}
              checked={selectedCategories.includes(category.id)}
            />
          ))}
        </Form.Group>
        <Form.Group className="mt-2" controlId="formImage">
        <Form.Label>Image</Form.Label>
        <Form.Control 
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
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
