import React from "react";
import { Card, Col, Badge, Button } from "react-bootstrap";
import { utils } from "near-api-js";

// Product Component
const Product = ({ product, buy, owner, onUpdate, remove }) => {
  const { id, price, name, description, sold, location, image } = product;

  const handleBuy = () => buy(id, price);
  const handleRemove = () => remove(id);

  return (
    <Col key={id}>
      <Card className="h-100">
        <Card.Header>
          <div className="d-flex justify-content-between">
            <span className="font-monospace text-secondary">{owner}</span>
            <Badge bg="secondary">{sold} Sold</Badge>
          </div>
          {owner === product.owner && (
            <>
              <Button variant="outline-danger" onClick={handleRemove}>
                Remove Product
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
            onClick={handleBuy}
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
