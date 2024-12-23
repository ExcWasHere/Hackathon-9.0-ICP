import { useState, useEffect } from "react";
import { Link, useNavigate } from "@remix-run/react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const validUsers = [
    { email: "user@example.com", password: "password123", name: "Excell" },
    { email: "admin@example.com", password: "admin123", name: "Admin User" }
  ];

  const Auth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const user = validUsers.find(
      u => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', user.name);

      navigate("/booking");
    } else {
      setMsg("Email atau password salah");
    }
  };

  return (
    <div className="min-h-screen bg-violet-50 flex items-center justify-center">
      <div className="w-full max-w-md px-4 py-8 sm:px-0">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full">
          {/* Logo dan Header */}
          <div className="mb-8 text-center">
            <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-violet-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mt-4">
              Welcome Back
            </h2>
            <p className="text-gray-600 mt-2">
              Sign in to access your booking dashboard
            </p>
          </div>

          {/* Tampilkan pesan error jika login gagal */}
          {msg && (
            <div className="mb-4 text-center text-red-500">
              {msg}
            </div>
          )}

          {/* Form login (mirip sebelumnya) */}
          <form onSubmit={Auth} className="space-y-6">
            {/* Email Field - tidak berubah */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-2 border text-slate-900 border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Field - tidak berubah */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full pl-10 pr-10 py-2 border text-slate-900 border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Bagian Remember Me & Forgot Password - tidak berubah */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="before: appearance-none checked:bg-violet-600 checked:border-transparent bg-slate-100 rounded-sm after: h-4 w-4 text-violet-600 focus:ring-violet-50"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-violet-600 hover:text-violet-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-colors duration-300"
            >
              Sign in
            </button>
          </form>

          {/* Sign Up Link - tidak berubah */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Dont have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-violet-600 hover:text-violet-500"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}