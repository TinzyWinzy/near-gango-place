import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddProduct from "./AddProduct";
import Product from "./Product";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import { getProducts as getProductList, buyProduct, createProduct } from "../../utils/marketplace";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    try {
      setLoading(true);
      const productList = await getProductList();
      setProducts(productList);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (data) => {
    try {
      setLoading(true);
      const resp = await createProduct(data);
      getProducts();
      toast.success("Product added successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create a product.");
    } finally {
      setLoading(false);
    }
  };

  const buy = async (id, price) => {
    try {
      await buyProduct({ id, price });
      getProducts();
      toast.success("Product bought successfully.");
    } catch (error) {
      toast.error("Failed to purchase product.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fs-4 fw-bold mb-0">Art Work</h1>
            <AddProduct save={addProduct} />
          </div>
          <Row xs={1} sm={2} lg={3} className="g-3 mb-5 g-xl-4 g-xxl-5">
            {products.map((_product) => (
              <Product key={_product.id} product={_product} buy={buy} />
            )}
          </Row>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Products; 
