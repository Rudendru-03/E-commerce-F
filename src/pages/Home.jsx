import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const FeaturedProduct = ({ product }) => (
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
        to={`/product/${product.id}`}
        className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        View Details
      </Link>
    </div>
  </div>
);

const CategoryLink = ({ name, image, link }) => (
  <Link to={link} className="block group">
    <div className="relative overflow-hidden rounded-lg shadow-md">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h3 className="text-white text-2xl font-bold">{name}</h3>
      </div>
    </div>
  </Link>
);

function Home() {
  const { user } = useSelector((state) => state.auth);
  const featuredProducts = useSelector((state) =>
    state.products.items.slice(0, 4)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-xl p-8 mb-8">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Our E-Commerce Store
        </h1>
        <p className="text-xl mb-6">
          Discover amazing products at unbeatable prices!
        </p>
        {user ? (
          <Link
            to="/products/all"
            className="bg-white text-blue-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
          >
            Shop Now
          </Link>
        ) : (
          <Link
            to="/login"
            className="bg-white text-blue-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
          >
            Sign In to Shop
          </Link>
        )}
      </div>

      {/* Featured Products Section */}
      {user && featuredProducts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <FeaturedProduct key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* Category Links Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <CategoryLink
            name="Clothes"
            image="/placeholder.svg?height=200&width=300"
            link="/products/clothes"
          />
          <CategoryLink
            name="Footwear"
            image="/placeholder.svg?height=200&width=300"
            link="/products/footwear"
          />
          <CategoryLink
            name="Electronics"
            image="/placeholder.svg?height=200&width=300"
            link="/products/electronics"
          />
          <CategoryLink
            name="Beauty"
            image="/placeholder.svg?height=200&width=300"
            link="/products/beauty"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
