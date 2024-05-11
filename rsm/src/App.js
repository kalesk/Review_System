import "./App.css";
import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";


function App() {
  const [formData, setFormData] = useState({
    title: "",
    rating: 0,
    description: ""
  });
  const [reviews, setReviews] = useState([]);

  const handleStarClick = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.rating) return;

    setReviews([...reviews, formData]);
    setFormData({ title: "", rating: 0, description: "" });
  };

  const handleDelete = (index) => {
    const updatedReviews = [...reviews];
    updatedReviews.splice(index, 1);
    setReviews(updatedReviews);
  };

  return (
    <Container fluid className="App text-light text-center">
      <h2 className="text-light">Review Management System</h2>
      <hr />
      <Col md={{ span: 6, offset: 3 }}>
        <Row className="mt-5">
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Rating Title"
                  required
                  style={{ marginBottom: "15px" }}
                />
              </Form.Group>
              <Form.Group>
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`fas fa-star ${formData.rating > i ? "text-warning" : "text-light"}`}
                    onClick={() => handleStarClick(i + 1)}
                    style={{ cursor: "pointer", marginRight: "2px", fontSize: "35px" }}
                  ></i>
                ))}
              </Form.Group>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter Your feedback!!"
                  required
                  style={{ marginTop: "15px", marginBottom: "15px" }}
                />
              </Form.Group>
              <div style={{ marginBottom: "15px" }}>
                <Button className="btn btn-warning mx-3" onClick={() => setFormData({ title: "", rating: 0, description: "" })}>
                  Reset
                </Button>
                <Button className="btn btn-success" type="submit" disabled={!formData.title || !formData.rating}>
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
        <Row className="mt-5">
          {reviews.map((review, index) => (
            <Col key={index} xs={12} md={6}>
              <Card className="mt-3 mb-3" style={{ maxWidth: "400px" }}>
                <Card.Body>
                  <h5>{review.title}</h5>
                  {[...Array(review.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star text-warning" style={{ marginRight: "2px" }}></i>
                  ))}
                  <p className="text-dark">{review.description}</p>
                </Card.Body>
                <Card.Footer>
                  <Button className="btn btn-danger" onClick={() => handleDelete(index)}>
                    Delete
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </Container>
  );
}

export default App;
