import { FaPlus, FaMinus } from 'react-icons/fa';
import PropTypes from 'prop-types';

const BasketItem = (props: any) => {
  const { product, basket, handleAddToCart, handleReduceQuantity, handleRemoveFromBasket } = props;

  return (
    <div key={product.id} className="list-group-item d-flex align-items-center">
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
        <div className="basket-item-actions">
          <div className="basket-item-quantity">
            <button onClick={() => handleAddToCart(product)} className="btn btn-outline-primary">
              <FaPlus />
            </button>
            <p className="basket-item-quantity-text">Qty: {basket[product.id] || 0}</p>
            <button onClick={() => handleReduceQuantity(product)} className="btn btn-outline-primary">
              <FaMinus />
            </button>
          </div>
          </div>
          <button onClick={() => handleRemoveFromBasket(product)} className="btn btn-danger">Remove</button>
        </div>
      </div>
    </div>
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