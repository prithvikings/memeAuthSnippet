import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const backend = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // ✅ Basic validation
    if (!firstname || !lastname || !email || !username || !password) {
      setError("All fields are required.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${backend}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, email, username, password }),
        credentials: "include", // ✅ Needed to receive cookies from backend
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Signup failed");

      setSuccess(true);
      setError(null);

      // ✅ Optional redirect after a short delay
      setTimeout(() => navigate("/login"), 1500);

      // ✅ Clear form
      setFirstname("");
      setLastname("");
      setEmail("");
      setUsername("");
      setPassword("");
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
          Register
        </h1>

        {/* ✅ Success message */}
        {success && (
          <p className="text-green-400 text-center font-medium text-sm">
            Account created successfully! Redirecting to login...
          </p>
        )}

        {/* ⚠️ Error message */}
        {error && (
          <p className="text-red-500 text-center font-medium text-sm">{error}</p>
        )}

        {/* First + Last Name */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2">
          <input
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            type="text"
            placeholder="First Name"
            className="w-full sm:w-1/2 px-4 py-2 bg-sky-50 text-sm font-medium text-zinc-800 placeholder-zinc-800 border-2 border-sky-800 outline-none"
            autoComplete="given-name"
          />
          <input
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            type="text"
            placeholder="Last Name"
            className="w-full sm:w-1/2 px-4 py-2 bg-sky-50 text-sm font-medium text-zinc-800 placeholder-zinc-800 border-2 border-sky-800 outline-none"
            autoComplete="family-name"
          />
        </div>

        {/* Email */}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="px-4 py-2 bg-sky-50 text-sm font-medium text-zinc-800 placeholder-zinc-800 border-2 border-sky-800 outline-none w-full"
          autoComplete="email"
        />

        {/* Username */}
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          className="px-4 py-2 bg-sky-50 text-sm font-medium text-zinc-800 placeholder-zinc-800 border-2 border-sky-800 outline-none w-full"
          autoComplete="username"
        />

        {/* Password */}
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="px-4 py-2 bg-sky-50 text-sm font-medium text-zinc-800 placeholder-zinc-800 border-2 border-sky-800 outline-none w-full"
          autoComplete="new-password"
        />

        {/* Footer */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-zinc-300 font-medium text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-sky-500 hover:underline">
              Login
            </Link>
          </p>

          <button
            onClick={handleSignup}
            disabled={loading}
            className={`${
              loading ? "bg-sky-400 cursor-not-allowed" : "bg-sky-600 hover:bg-sky-700"
            } text-white text-lg font-semibold px-4 py-2 mt-2 w-full sm:w-2/3 transition-all`}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
