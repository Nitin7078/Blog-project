// // import React, { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { login as authLogin } from "../store/authslice";
// // import { Button, Input, Logo } from "./index";
// // import authservice from "../appwrite/auth";
// // import { useDispatch } from "react-redux";
// // import { useForm } from "react-hook-form";

// // function Login() {
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();
// //   const { register, handleSubmit } = useForm();
// //   const [error, setError] = useState("");

// //   const login = async (data) => {
// //   setError("");

// //   try {
// //     // Check if a session already exists
// //     const currentUser = await authservice.Getcurrentuser();

// //     if (currentUser) {
// //       dispatch(authLogin(currentUser));
// //       navigate("/");
// //       return;
// //     }

// //     // No active session → create a new session
// //     const session = await authservice.login(
// //       data.email,
// //       data.password
// //     );

// //     if (session) {
// //       const userData = await authservice.Getcurrentuser();

// //       if (userData) {
// //         dispatch(authLogin(userData));
// //         navigate("/");
// //       }
// //     }
// //   } catch (error) {
// //     console.log("Login error:", error);
// //     setError(error.message);
// //   }
// // };


// //   return (
// //     <div className="flex items-center justify-center w-full">
// //       <div
// //         className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
// //       >
// //         <div className="mb-2 flex justify-center">
// //           <span className="inline-block w-full max-w-[200px]">
// //             <Logo width="100%"  />
// //           </span>
// //         </div>
// //         <h2 className="text-center text-2xl font-bold leading-tight">
// //           Sign in to your account
// //         </h2>
// //         <p className="mt-2 text-center text-base text-black/60">
// //           Don&apos;t have any account?&nbsp;
// //           <Link
// //             to="/signup"
// //             className="font-medium text-primary transition-all duration-200 hover:underline"
// //           >
// //             Sign Up
// //           </Link>
// //         </p>
// //         {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

// //         <form onSubmit={handleSubmit(login)} className="mt-8">
// //           <div className="space-y-5">
// //             <Input
// //               label="Email: "
// //               placeholder="Enter your email"
// //               type="email"
// //               {...register("email", {
// //                 required: true,
// //                 validate: {
// //                   matchPattern: (value) =>
// //                     /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
// //                     "Email address must be a valid address",
// //                 },
// //               })}
// //             />
// //             <Input
// //               label="Password: "
// //               type="password"
// //               placeholder="Enter your password"
// //               {...register("password", {
// //                 required: true,
// //               })}
// //             />
// //             <Button type="submit" className="w-full">
// //               Sign in
// //             </Button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;

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

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const login = async (data) => {
//     setError("");
//     setLoading(true);

//     try {
//       // Check if a session already exists
//       const currentUser = await authservice.Getcurrentuser();

//       if (currentUser) {
//         dispatch(authLogin(currentUser));
//         navigate("/");
//         return;
//       }

//       // Create new session
//       const session = await authservice.login(
//         data.email,
//         data.password
//       );

//       if (session) {
//         const userData = await authservice.Getcurrentuser();

//         if (userData) {
//           dispatch(authLogin(userData));
//           navigate("/");
//         }
//       }
//     } catch (error) {
//       console.log("Login error:", error);
//       setError(
//         error?.message || "Invalid email or password."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-[100vh] w-full items-center justify-center bg-slate-100 px-4 py-10">

//       {/* Login Card */}
//       <div className="w-full max-w-lg">

//         <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl sm:p-10">

//           {/* Logo */}
//           <div className="mb-7 flex justify-center">
//             <div className="flex h-24 w-48 items-center justify-center">
//               <Logo width="100%" />
//             </div>
//           </div>

//           {/* Heading */}
//           <div className="mb-8 text-center">
//             <h1 className="text-3xl font-bold tracking-tight text-gray-900">
//               Welcome back
//             </h1>

//             <p className="mt-2 text-sm text-gray-500">
//               Sign in to continue to your account
//             </p>
//           </div>

//           {/* Error */}
//           {error && (
//             <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
//               {error}
//             </div>
//           )}

//           {/* Form */}
//           <form onSubmit={handleSubmit(login)}>
//             <div className="space-y-5">

//               {/* Email */}
//               <div>
//                 <Input
//                   label="Email"
//                   placeholder="Enter your email"
//                   type="email"
//                   className="w-full"
//                   {...register("email", {
//                     required: "Email is required",
//                     validate: (value) =>
//                       /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
//                       "Please enter a valid email address",
//                   })}
//                 />

//                 {errors.email && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.email.message}
//                   </p>
//                 )}
//               </div>

//               {/* Password */}
//               <div>
//                 <Input
//                   label="Password"
//                   type="password"
//                   placeholder="Enter your password"
//                   className="w-full"
//                   {...register("password", {
//                     required: "Password is required",
//                   })}
//                 />

//                 {errors.password && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.password.message}
//                   </p>
//                 )}
//               </div>

//               {/* Login Button */}
//               <Button
//                 type="submit"
//                 disabled={loading}
//                 className="mt-3 w-full rounded-xl bg-blue-600 py-3 text-base font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 {loading ? "Signing in..." : "Sign In"}
//               </Button>
//             </div>
//           </form>

//           {/* Divider */}
//           <div className="my-7 flex items-center gap-4">
//             <div className="h-px flex-1 bg-gray-200" />

//             <span className="text-xs font-medium text-gray-400">
//               OR
//             </span>

//             <div className="h-px flex-1 bg-gray-200" />
//           </div>

//           {/* Signup */}
//           <p className="text-center text-sm text-gray-500">
//             Don't have an account?{" "}
//             <Link
//               to="/signup"
//               className="font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-700 hover:underline"
//             >
//               Create an account
//             </Link>
//           </p>
//         </div>

//         {/* Bottom text */}
//         <p className="mt-6 text-center text-xs text-gray-400">
//           Share your stories. Inspire the world.
//         </p>
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
      const currentUser = await authservice.Getcurrentuser();

      if (currentUser) {
        dispatch(authLogin(currentUser));
        navigate("/");
        return;
      }

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
      setError(error?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-950 px-4 py-10">

      {/* Background decoration */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">

        <div className="rounded-[2rem] border border-white/10 bg-white/95 p-8 shadow-2xl backdrop-blur-xl sm:p-10">

          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="flex h-20 w-44 items-center justify-center">
              <Logo width="100%" />
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome back 👋
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Sign in to continue to your account
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
                !
              </span>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(login)}>

            <div className="space-y-5">

              {/* Email */}
              <div>
                <Input
                  label="Email address"
                  placeholder="you@example.com"
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
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Password
                  </span>
                </div>

                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="mt-1.5 w-full"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />

                {errors.password && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember / Forgot */}
              <div className="flex items-center justify-between text-sm">

                <label className="flex cursor-pointer items-center gap-2 text-gray-500">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 accent-blue-600"
                  />
                  Remember me
                </label>

                <button
                  type="button"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </button>

              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={loading}
                className="group mt-2 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing in...
                  </div>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                )}
              </Button>

            </div>
          </form>

          {/* Divider */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-xs font-semibold text-gray-400">
              OR
            </span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Signup */}
          <div className="rounded-xl bg-gray-50 p-4 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-bold text-blue-600 transition-colors hover:text-blue-700"
              >
                Create an account
              </Link>
            </p>
          </div>

        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-400">
          Share your stories. Inspire the world. ✨
        </p>

      </div>
    </div>
  );
}

export default Login;
