import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exist = users.find((u) => u.email === data.email);
    if (exist) {
      alert("Email already exists. Try logging in.");
      return;
    }
    users.push({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/login");
  };

  const password = watch("password");

  return (
    <section className="flex flex-col md:flex-row h-screen">
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-[#0f3460] text-white p-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Mega Mart</h1>
        <p className="text-lg text-gray-200 max-w-md">
          Discover premium products at unbeatable prices. Sign up now and unlock exclusive deals and offers!
        </p>
      </div>

      <div className="flex items-center justify-center w-full md:w-1/2 bg-gray-100">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-6 text-[#0f3460]">
            Create Account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder=" "
                {...register("name", { required: "Please enter your name." })}
                className={`peer border rounded-lg w-full p-3 pt-5 pb-2 focus:outline-none focus:ring ${
                  errors.name ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-[#0f3460]/30"
                }`}
              />
              <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#0f3460]">
                Full Name
              </label>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div className="relative">
              <input
                type="email"
                placeholder=" "
                {...register("email", {
                  required: "Please enter your email.",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email address." }
                })}
                className={`peer border rounded-lg w-full p-3 pt-5 pb-2 focus:outline-none focus:ring ${
                  errors.email ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-[#0f3460]/30"
                }`}
              />
              <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#0f3460]">
                Email
              </label>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder=" "
                {...register("password", {
                  required: "Please enter your password.",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/,
                    message: "Password must be at least 8 characters, include one uppercase letter and one special character."
                  }
                })}
                className={`peer border rounded-lg w-full p-3 pt-5 pb-2 pr-10 focus:outline-none focus:ring ${
                  errors.password ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-[#0f3460]/30"
                }`}
              />
              <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#0f3460]">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-3 flex items-center justify-center w-8 h-8 rounded"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.02.153-2.005.44-2.93M6.6 6.6A10.05 10.05 0 0112 5c5.523 0 10 4.477 10 10 0 1.02-.153 2.005-.44 2.93M3 3l18 18" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder=" "
                {...register("confirmPassword", {
                  required: "Please confirm your password.",
                  validate: (value) => value === password || "Passwords do not match."
                })}
                className={`peer border rounded-lg w-full p-3 pt-5 pb-2 pr-10 focus:outline-none focus:ring ${
                  errors.confirmPassword ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-[#0f3460]/30"
                }`}
              />
              <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#0f3460]">
                Confirm Password
              </label>
              <button
                type="button"
                onClick={() => setShowConfirmPassword((s) => !s)}
                className="absolute right-2 top-3 flex items-center justify-center w-8 h-8 rounded"
              >
                {showConfirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.02.153-2.005.44-2.93M6.6 6.6A10.05 10.05 0 0112 5c5.523 0 10 4.477 10 10 0 1.02-.153 2.005-.44 2.93M3 3l18 18" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-[#0f3460] text-white p-3 rounded-lg hover:bg-[#162a4d] transition"
            >
              Create Account
            </button>
          </form>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#0f3460] font-semibold cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
