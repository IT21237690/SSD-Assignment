import axios from "../axios";
import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import categories from "../categories";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import ProductPreview from "../components/ProductPreview";

function Home() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const lastProducts = products.slice(0, 8);
    useEffect(() => {
        axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
    }, []);

    return (
        <div>
            <img src="https://res.cloudinary.com/dy60xh6gf/image/upload/v1682368954/WISHWA_FOOD_CENTER_2_jpiywj.png" className="home-banner" />
            <div className="featured-products-container container mt-4">
                <h2>Products</h2>
                {/* last products here */}
                <div className="d-flex justify-content-center flex-wrap">
                    {lastProducts.map((product) => (
                        <ProductPreview {...product} />
                    ))}
                </div>
                <div className="text-end mt-3">
                    <Button as={Link}
          to="/category/all"
          className="rounded-pill rounded-button"
        >
                        See more
                    </Button>
                </div>
            </div>
            {/* sale banner */}
            <div className="sale__banner--container mt-4">
                <img src="https://res.cloudinary.com/dy60xh6gf/image/upload/v1682368961/fresh_healthy_1_ohaaam.png" />
            </div>
            <div className="recent-products-container container mt-4">
                <h2>Categories</h2>
                <Row>
                    {categories.map((category) => (
                        <LinkContainer to={`/category/${category.name.toLocaleLowerCase()}`}>
                            <Col md={4}>
                                <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`, gap: "10px" }} className="category-tile">
                                    {category.name}
                                </div>
                            </Col>
                        </LinkContainer>
                    ))}
                </Row>
            </div>
        </div>
    );
}

export default Home;
