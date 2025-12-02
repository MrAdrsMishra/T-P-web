import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { RiAdminFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import useAuthStore from "../../store/user-auth-store/useAuthStore";
const Login = () => {
  const login = useAuthStore((state) => state.login);
  const { isLoading, error } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login({ email, password, role });
    if (result?.status==200) {
      role == "admin"
      ? navigate("/admin-dashboard/dashboard")
        : navigate("/student-dashboard/analysis");
    }
    else{
      alert("false")
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100 overflow-auto">
      <motion.div
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 md:p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-center text-2xl font-bold mb-6">
          Sign in to your account
        </h2>

        {error && (
          <motion.div
            className="bg-red-100 text-red-700 p-3 rounded-md mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}
          <motion.div
            className="bg-neutral-100 text-neutral-400 p-3 rounded-md mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div  className="text-center text-gray-800 font-mono"> Visitng as Guest</div>
            <div>
              Email : example123@gmail.com <br />
              password: Example@123
            </div>
            <div>
              Email : student123@gmail.com <br />
              password: 0177AL221001
            </div>
          </motion.div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="form-input w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="form-input w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center gap-2">
            <motion.button
              type="button"
              className={`px-3 py-1 border rounded text-sm flex items-center gap-1 transition
                ${role=='admin'? 'bg-gray-400':'bg-gray-100'}`}
              onClick={() => setRole("admin")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <RiAdminFill className="text-base" />
              Admin
            </motion.button>

            <motion.button
              type="button"
              className={`px-3 py-1 border rounded text-sm flex items-center gap-1 transition
                ${role=='student'? 'bg-gray-400':'bg-gray-100'}`}
              onClick={() => setRole("student")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <PiStudent className="text-base" />
              Student
            </motion.button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="form-checkbox"
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
                className="text-blue-600 hover:text-blue-800"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <motion.button
              type="submit"
              className="btn-primary w-full"
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </motion.button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                or Sign in with
              </span>
            </div>
          </div>

          {/* <FaGithub /> */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <motion.button
              type="button"
              className="btn-outline text-xs flex items-center justify-around"
              onClick={() => alert("want to login with Google")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FcGoogle />
              continue with google
            </motion.button>
            <motion.button
              type="button"
              className="btn-outline text-xs flex items-center justify-around"
              onClick={() => alert("want to login with github")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub /> continue with github
            </motion.button>
            <motion.button
              type="button"
              className="btn-outline text-xs flex items-center justify-around"
              onClick={() => alert("want to login with twitter")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaXTwitter /> continue with twitter
            </motion.button>
            <motion.button
              type="button"
              className="btn-outline text-xs flex items-center justify-around"
              onClick={() => alert("want to login with facebook")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaFacebookF /> continue with facebook
            </motion.button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
