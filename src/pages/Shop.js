import { useEffect, useState } from "react";
import axios from "axios";
import "./Shop.css"; // Make sure to import the CSS

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://api.freeapi.app/api/v1/public/randomproducts")
      .then(response => setProducts(response.data.data.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);
  console.log(products)
  return (
    <div className="shop-container">
      <h2 className="shop-title">Shop</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.images[0]} alt={product.title} className="product-image" />
            <div className="product-details">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">${product.price}</p>
              <button className="product-button">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
