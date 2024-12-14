import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function ProductDetails() {
  const { category, id } = useParams();
  const product = useSelector((state) =>
    state.products.items[category]?.find((p) => p._id === id)
  );

  if (!product) {
    return <div className="text-center mt-8">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-bold mb-4">${product.price.toFixed(2)}</p>
          <div className="mb-4">
            <span className="font-semibold">Category:</span>{" "}
            {product.subCategory}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Brand:</span> {product.brand}
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
