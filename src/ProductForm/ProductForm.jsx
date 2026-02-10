import React from "react";
import { generateProductDetails } from "../service/fetchDataFromAi";

function ProductForm({ onProductSubmit }) {
  const [productName, setProductName] = React.useState("");
  const [productCategory, setProductCategory] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName.trim() || !productCategory.trim()) {
      alert("Please enter both Product Name and Category");
      return;
    }

    try {
      setLoading(true);
      const productDetails = await generateProductDetails(
        productName,
        productCategory
      );
      console.log(productDetails);
      onProductSubmit(productDetails);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form">
      <h1>Product Form</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="e.g. Cricket Bat"
          />
        </div>

        <div>
          <label htmlFor="productCategory">Product Category:</label>
          <input
            type="text"
            id="productCategory"
            name="productCategory"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            placeholder="e.g. Sports Equipment"
          />
        </div>

        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Generating..." : "Generate Details"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
