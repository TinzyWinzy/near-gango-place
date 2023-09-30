import React, { useState } from "react";
import { Modal, Button, Card, Col, Badge, Stack } from "react-bootstrap";
import { utils } from "near-api-js";

// UpdateProductModal Component
const UpdateProductModal = ({ product, onUpdate }) => {
  const [show, setShow] = useState(false);
  const [updatedProductData, setUpdatedProductData] = useState({ ...product });

  const handleClose = () => {
    setShow(false);
    setUpdatedProductData({ ...product });
  };

  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProductData({
      ...updatedProductData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onUpdate(updatedProductData);
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
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Product Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={updatedProductData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={updatedProductData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price (in NEAR)
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={updatedProductData.price}
                onChange={handleInputChange}
              />
            </div>
          </form>
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

// Product Component
const Product = ({ product, buy, owner, onUpdate, onWithdraw }) => {
  const { id, price, name, description, sold, location, image } = product;

  const triggerBuy = () => {
    buy(id, price);
  };

  const triggerWithdraw = () => {
    onWithdraw(id);
  };

  return (
    <Col key={id}>
      <Card className="h-100">
        <Card.Header>
          <Stack direction="horizontal" gap={2}>
            <span className="font-monospace text-secondary">{owner}</span>
            <Badge bg="secondary" className="ms-auto">
              {sold} Sold
            </Badge>
          </Stack>
          {owner === product.owner && (
            <>
              <UpdateProductModal product={product} onUpdate={onUpdate} />
              <Button variant="outline-danger" onClick={triggerWithdraw}>
                Withdraw
              </Button>
            </>
          )}
        </Card.Header>
        <div className="ratio ratio-4x3">
          <img src={image} alt={name} style={{ objectFit: "cover" }} />
        </div>
        <Card.Body className="d-flex flex-column text-center">
          <Card.Title>{name}</Card.Title>
          <Card.Text className="flex-grow-1">{description}</Card.Text>
          <Card.Text className="text-secondary">
            <span>{location}</span>
          </Card.Text>
          <Button
            variant="outline-dark"
            onClick={triggerBuy}
            className="w-100 py-3"
          >
            Buy for {utils.format.formatNearAmount(price)} NEAR
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Product;
