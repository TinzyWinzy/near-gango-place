// UpdateProductModal.js
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const UpdateProductModal = ({ product, onUpdate }) => {
  const [show, setShow] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    // Add other fields as needed
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProduct({
      ...updatedProduct,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onUpdate(updatedProduct);
    handleClose();
  };

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        Update
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={updatedProduct.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={updatedProduct.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price (NEAR)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={updatedProduct.price}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateProductModal;
