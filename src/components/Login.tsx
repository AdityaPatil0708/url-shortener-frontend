import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

async function handleLogin() {
  setError("");
  setLoading(true);

  const email = (document.getElementById("login-email") as HTMLInputElement).value;
  const password = (document.getElementById("login-pass") as HTMLInputElement).value;

  try {
    const response = await fetch("https://13.239.16.20.nip.io:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Login failed");
      return;
    }

    localStorage.setItem("token", data.token);
    navigate("/");
  } catch (err) {
    setError("Network error. Please try again.");
  } finally {
    setLoading(false);
  }
}
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-90 border border-gray-500 rounded-md p-5 pt-8 md:pt-10 pb-8 md:pb-10">
        <h2 className="text-lg md:text-xl font-semibold text-center mb-6 md:mb-8 text-gray-300">
          Welcome to <span className="bg-linear-to-b from-blue-400 to-blue-700 bg-clip-text text-transparent">ShortURL!</span>
        </h2>
        <div></div>
        <div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              className="w-full px-3 py-3 border border-gray-500 rounded-md text-gray-300 text-xs outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              id="login-pass"
              type="password"
              className="w-full px-3 py-3 border border-gray-500 rounded-md text-gray-300 text-xs outline-none"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="text-red-400 rounded-md text-xs mb-2 pl-3">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full mt-4 bg-linear-to-b from-blue-400 to-blue-600 text-gray-100 text-xs py-3 rounded-md hover:cursor-pointer hover:opacity-90 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
        <p className="mt-4 text-center text-xs md:text-sm text-gray-300">
          Don't have an account?{" "}
          <a
            onClick={() => navigate("/signup")}
            className="underline hover:cursor-pointer font-semibold text-gray-200"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}