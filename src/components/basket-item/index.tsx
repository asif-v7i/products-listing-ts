import { FaPlus, FaMinus } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

const BasketItem = (props: any) => {
  const { product, basket, handleAddToCart, handleReduceQuantity, handleRemoveFromBasket } = props;

  return (
    <Card key={product.id} data-testid="product-item" className='basket-item'>
      <div className="basket-item-container">
        <div className="basket-item-left-container">
          <div className="basket-item-image">
            <img src={product.img} alt={product.name} className="basket-item-image" />
          </div>
          <div className="basket-item-details">
            <p className="basket-item-name">{product.name}</p>
            <p className="basket-item-price">Price: ${product.price}</p>
          </div>
        </div>
        <div className="basket-item-right-container">
          
            <div className="basket-item-quantity">
              <Button
                data-testid={`add-button-${product.id}`}
                onClick={() => handleAddToCart(product)}
                variant="outline-primary"
              >
                <FaPlus />
              </Button>
              <p data-testid={`quantity-${product.id}`} className="basket-item-quantity text">
                Qty: {basket[product.id] || 0}
              </p>
              <Button
                data-testid={`reduce-button-${product.id}`}
                onClick={() => handleReduceQuantity(product)}
                variant="outline-primary"
              >
                <FaMinus />
              </Button>
            </div>
          
          <Button
            data-testid={`remove-button-${product.id}`}
            onClick={() => handleRemoveFromBasket(product)}
            variant="danger"
          >
            Remove
          </Button>
        </div>
      </div>
    </Card>
  );
};

BasketItem.propTypes = {
  product: PropTypes.any.isRequired,
  basket: PropTypes.any.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  handleReduceQuantity: PropTypes.func.isRequired,
  handleRemoveFromBasket: PropTypes.func.isRequired,
};

export default BasketItem;