import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2">{product.brand}</p>
        <p className="text-gray-800 font-bold">${product.price.toFixed(2)}</p>
        <Link
          to={`/product/${product._id}`}
          className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
