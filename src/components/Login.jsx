// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { login as authLogin } from "../store/authslice";
// import { Button, Input, Logo } from "./index";
// import authservice from "../appwrite/auth";
// import { useDispatch } from "react-redux";
// import { useForm } from "react-hook-form";

// function Login() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { register, handleSubmit } = useForm();
//   const [error, setError] = useState("");

//   const login = async (data) => {
//   setError("");

//   try {
//     // Check if a session already exists
//     const currentUser = await authservice.Getcurrentuser();

//     if (currentUser) {
//       dispatch(authLogin(currentUser));
//       navigate("/");
//       return;
//     }

//     // No active session → create a new session
//     const session = await authservice.login(
//       data.email,
//       data.password
//     );

//     if (session) {
//       const userData = await authservice.Getcurrentuser();

//       if (userData) {
//         dispatch(authLogin(userData));
//         navigate("/");
//       }
//     }
//   } catch (error) {
//     console.log("Login error:", error);
//     setError(error.message);
//   }
// };


//   return (
//     <div className="flex items-center justify-center w-full">
//       <div
//         className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
//       >
//         <div className="mb-2 flex justify-center">
//           <span className="inline-block w-full max-w-[200px]">
//             <Logo width="100%"  />
//           </span>
//         </div>
//         <h2 className="text-center text-2xl font-bold leading-tight">
//           Sign in to your account
//         </h2>
//         <p className="mt-2 text-center text-base text-black/60">
//           Don&apos;t have any account?&nbsp;
//           <Link
//             to="/signup"
//             className="font-medium text-primary transition-all duration-200 hover:underline"
//           >
//             Sign Up
//           </Link>
//         </p>
//         {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

//         <form onSubmit={handleSubmit(login)} className="mt-8">
//           <div className="space-y-5">
//             <Input
//               label="Email: "
//               placeholder="Enter your email"
//               type="email"
//               {...register("email", {
//                 required: true,
//                 validate: {
//                   matchPattern: (value) =>
//                     /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//                     "Email address must be a valid address",
//                 },
//               })}
//             />
//             <Input
//               label="Password: "
//               type="password"
//               placeholder="Enter your password"
//               {...register("password", {
//                 required: true,
//               })}
//             />
//             <Button type="submit" className="w-full">
//               Sign in
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authslice";
import { Button, Input, Logo } from "./index";
import authservice from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (data) => {
    setError("");
    setLoading(true);

    try {
      // Check if a session already exists
      const currentUser = await authservice.Getcurrentuser();

      if (currentUser) {
        dispatch(authLogin(currentUser));
        navigate("/");
        return;
      }

      // Create new session
      const session = await authservice.login(
        data.email,
        data.password
      );

      if (session) {
        const userData = await authservice.Getcurrentuser();

        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      console.log("Login error:", error);
      setError(
        error?.message || "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center bg-slate-100 px-4 py-10">

      {/* Login Card */}
      <div className="w-full max-w-lg">

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl sm:p-10">

          {/* Logo */}
          <div className="mb-7 flex justify-center">
            <div className="flex h-24 w-48 items-center justify-center">
              <Logo width="100%" />
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Sign in to continue to your account
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(login)}>
            <div className="space-y-5">

              {/* Email */}
              <div>
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  className="w-full"
                  {...register("email", {
                    required: "Email is required",
                    validate: (value) =>
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                      "Please enter a valid email address",
                  })}
                />

                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />

                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={loading}
                className="mt-3 w-full rounded-xl bg-blue-600 py-3 text-base font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </div>
          </form>

          {/* Divider */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-xs font-medium text-gray-400">
              OR
            </span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Signup */}
          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-700 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Bottom text */}
        <p className="mt-6 text-center text-xs text-gray-400">
          Share your stories. Inspire the world.
        </p>
      </div>
    </div>
  );
}

export default Login;
