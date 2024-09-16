import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const response = await fetch("https://trailer-time-server-api.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true");
        toast.success("Login successful!");
        setTimeout(() => {
          setLoading(false); 
          navigate("/");
        }, 1000);
      } else {
        toast.error(data.message || "Login failed");
        setLoading(false); 
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      setLoading(false); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ToastContainer />
      <div className="p-8 rounded-lg w-full max-w-md shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
        <h2 className="text-2xl font-bold mb-6 text-white">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-white font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            disabled={loading} 
          >
            {loading ? "Logging..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-gray-600 text-sm">
          Don't have an account?{" "}
          <div className="flex  justify-between">
            <span
              className="text-blue-500 hover:underline"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register here
            </span>
            <span
              className="text-blue-500 hover:underline"
              onClick={() => {
                navigate("/reset-password");
              }}
            >
              Reset Password
            </span>
          </div>
        </p>
      </div>
    </div>
  );
};

export default Login;
