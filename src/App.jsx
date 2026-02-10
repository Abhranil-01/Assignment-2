import { useState } from 'react';
import './App.css';
import ProductForm from './ProductForm/ProductForm';
import ProductCard from './ProductCard/ProductCard';

function App() {
  const [productData, setProductData] = useState(null);

  return (
    <>
      <h1>Please Enter Product Details To Generate Product Card</h1>
      <ProductForm onProductSubmit={setProductData} />

      {productData && <ProductCard data={productData} />}
    </>
  );
}

export default App;
