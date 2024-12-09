import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../store/slices/productsSlice";
import ProductCard from "../components/ProductCard";

function ProductList() {
  const dispatch = useDispatch();
  const { category } = useParams();
  const {
    items: products,
    status,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (category === "all") {
      dispatch(fetchProducts("clothes"));
      dispatch(fetchProducts("footwear"));
      dispatch(fetchProducts("electronics"));
      dispatch(fetchProducts("beauty"));
    } else {
      dispatch(fetchProducts(category));
    }
  }, [dispatch, category]);

  if (status === "loading") {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 capitalize">
        {category === "all" ? "All Products" : `${category} Products`}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
