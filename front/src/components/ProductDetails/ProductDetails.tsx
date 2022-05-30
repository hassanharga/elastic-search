import React, { FC } from 'react';
import { Product } from '../../types/product';
import './ProductDetails.css';

const ProductDetails: FC<{ product: Product; productClick: (productId: string) => void }> = ({
  product,
  productClick,
}) => {
  return (
    <div className="product-container" onClick={() => productClick(product.DEVICE_ID)}>
      <h4>{product.NAME_AR}</h4>
      {product.SUMMARY_AR && (
        <div className="summary">
          summary:<p> {product.SUMMARY_EN}</p>
        </div>
      )}
      {product.INSERT_DATE && (
        <div>
          insert date: <p>{product.INSERT_DATE.toString()}</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
