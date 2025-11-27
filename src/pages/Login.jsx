import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const ADMIN = { email: "admin@meegamart.com", password: "Admin@123" };

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (data.email === ADMIN.email && data.password === ADMIN.password) {
      login({ email: data.email, role: "admin" }); 
      navigate("/admin");
      return;
    }

    const exist = users.find((u) => u.email === data.email && u.password === data.password);
    if (!exist) return alert("Invalid email or password.");

    login({ email: data.email, role: "user" }); 
    navigate("/"); 
  };

  return (
    <section className="flex flex-col md:flex-row h-screen">
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-[#0f3460] text-white p-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome Back to Mega Mart</h1>
        <p className="text-lg text-gray-200 max-w-md">Log in to continue shopping your favorite products.</p>
      </div>

      <div className="flex items-center justify-center w-full md:w-1/2 bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center text-[#0f3460]">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         
            <div className="relative">
              <input 
                type="email" 
                placeholder=" " 
                {...register("email", { required: true })} 
                className="peer border rounded-lg w-full p-3 pt-5 pb-2 focus:outline-none focus:ring border-gray-300 focus:ring-[#0f3460]/30" 
              />
              <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#0f3460]">
                Email
              </label>
              {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
            </div>

            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder=" " 
                {...register("password", { required: true })} 
                className="peer border rounded-lg w-full p-3 pt-5 pb-2 pr-10 focus:outline-none focus:ring border-gray-300 focus:ring-[#0f3460]/30" 
              />
              <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#0f3460]">
                Password
              </label>
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-2 top-3 w-8 h-8 flex items-center justify-center"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              {errors.password && <p className="text-red-500 text-sm mt-1">Password is required</p>}
            </div>

            <button 
              type="submit" 
              className="bg-[#0f3460] text-white py-2 px-4 rounded-lg w-full hover:bg-[#162a4d] transition"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Dont have an account? 
            <span className="text-[#0f3460] font-semibold cursor-pointer" onClick={() => navigate("/register")}>
              Register
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
