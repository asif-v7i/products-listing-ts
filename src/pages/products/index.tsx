// ProductList.tsx
import React, { useState, useEffect } from 'react';
import { fetchData } from '../../utils/api';
import { Basket, Product } from '../../utils/dataTypes';
import BasketItem from '../../components/basket-item';
import { Container, Row, Col, Form, ListGroup, Card } from 'react-bootstrap';


const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [basket, setBasket] = useState<Basket>({});
  const [total, setTotal] = useState<number>(0);
  const [colorFilter, setColorFilter] = useState<string>('');
  const [availableColors, setAvailableColors] = useState<string[]>([]);

  useEffect(() => {
    // Fetch product data from the provided API
    const fetchProducts = async () => {
      const data = await fetchData();
      setProducts(data);
      setFilteredProducts(data);
      setAvailableColors(
        Array.from(new Set(data.map((product: any) => product.colour)))
      );
    }
    fetchProducts();

  }, []);

  useEffect(() => {
    // Update filtered products based on color filter
    setFilteredProducts(
      colorFilter ? products.filter(product => product.colour === colorFilter) : products
    );
  }, [colorFilter, products]);

  const handleAddToCart = (product: Product) => {
    const productId = product.id;
    setBasket({
      ...basket,
      [productId]: (basket[productId] || 0) + 1,
    });
    setTotal(Number((total + product.price).toFixed(2)));
  };

  const handleReduceQuantity = (product: Product) => {
    const productId = product.id;
    if (!basket[productId]) return;
    if (basket[productId] && basket[productId] > 1) {
      setBasket({
        ...basket,
        [productId]: basket[productId] - 1,
      });
    } else {
      // Remove item from basket if quantity is 1 or less
      const { [productId]: _, ...newBasket } = basket;
      setBasket(newBasket);
    }
    setTotal(Number((total - product.price).toFixed(2)));
  };

  const handleRemoveFromBasket = (product: Product) => {
    const productId = product.id;
    const { [productId]: _, ...newBasket } = basket;
    const productQuantity = basket[productId];
    setBasket(newBasket);
    setTotal(Number((total - (product.price * productQuantity)).toFixed(2)));
  };


  return (
    <Container>
      <Row>
        <h1 className="mb-4">Product Listings</h1>
        {/* Color Filter */}
        <Form.Select
          data-testid="color-filter"
          className="mb-4"
          onChange={(e) => setColorFilter(e.target.value)}
        >
          <option value="">All Colors</option>
          {availableColors.map((color) => (
            <option data-testid={color} key={color} value={color}>
              {color}
            </option>
          ))}
        </Form.Select>
        <Card>
          <Col>
            {/* Product Listings */}
            <ListGroup id="products-list">
              {filteredProducts.map((product) => (
                <BasketItem
                  key={product.id}
                  product={product}
                  basket={basket}
                  handleAddToCart={handleAddToCart}
                  handleReduceQuantity={handleReduceQuantity}
                  handleRemoveFromBasket={handleRemoveFromBasket}
                />
              ))}
            </ListGroup>

            {/* Total */}

          </Col>
          <Row className="justify-content-end">
            <Col xs={12} className="mt-4">
              <p data-testid="total" className="total-price text-end">
                Total: ${total}
              </p>
            </Col>
          </Row>
        </Card>
      </Row>

    </Container>
  );
};

export default ProductList;
