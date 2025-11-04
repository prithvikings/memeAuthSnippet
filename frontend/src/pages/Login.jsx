import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dataContext } from "../context/Usercontext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const backend = import.meta.env.VITE_BACKEND_URL;
  const value = useContext(dataContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    // ✅ Basic validation
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${backend}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // ✅ Needed for cookies
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      // ✅ Store user in context if applicable
      if (value?.setUser) {
        value.setUser(data.user);
      }

      // ✅ Clear form
      setEmail("");
      setPassword("");

      // ✅ Redirect to dashboard/home
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-zinc-900 flex items-center justify-center px-4">
      <div className="bg-zinc-800 p-10 sm:p-14 flex flex-col gap-8 w-full max-w-md rounded-lg shadow-lg">
        <h1 className="text-3xl sm:text-4xl font-bold -tracking-tight font-mono text-sky-300 text-center">
          Login
        </h1>

        {/* Error message */}
        {error && (
          <p className="text-red-500 text-sm text-center font-medium">
            {error}
          </p>
        )}

        {/* Email */}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="px-4 py-2 bg-sky-50 text-sm font-medium text-zinc-800 placeholder-zinc-800 border-2 border-sky-800 outline-none w-full"
          autoComplete="email"
        />

        {/* Password */}
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="px-4 py-2 bg-sky-50 text-sm font-medium text-zinc-800 placeholder-zinc-800 border-2 border-sky-800 outline-none w-full"
          autoComplete="current-password"
        />

        {/* Footer */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-zinc-300 font-medium text-sm text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-sky-500 hover:underline">
              Sign up
            </Link>
          </p>

          <button
            onClick={handleLogin}
            disabled={loading}
            className={`${
              loading ? "bg-sky-400 cursor-not-allowed" : "bg-sky-600 hover:bg-sky-700 cursor-pointer"
            } text-white text-lg font-semibold px-4 py-2 mt-2 w-full sm:w-2/3 transition-all`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
