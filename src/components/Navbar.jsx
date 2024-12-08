import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            E-Commerce Store
          </Link>
          <div className="space-x-4">
            {user ? (
              <>
                <Link to="/products/clothes" className="hover:text-gray-300">
                  Clothes
                </Link>
                <Link to="/products/footwear" className="hover:text-gray-300">
                  Footwear
                </Link>
                <Link
                  to="/products/electronics"
                  className="hover:text-gray-300"
                >
                  Electronics
                </Link>
                <Link to="/products/beauty" className="hover:text-gray-300">
                  Beauty
                </Link>
                <button onClick={handleLogout} className="hover:text-gray-300">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
