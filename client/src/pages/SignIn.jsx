/* eslint-disable react/no-unescaped-entities */
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("All fields are required"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success == false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Left side - Branding */}
              <div className="md:w-1/2 bg-gradient-to-br from-purple-600 to-blue-500 p-12 text-white">
                <div className="h-full flex flex-col justify-center">
                  <Link to="/" className="inline-block mb-8">
                    <h1 className="text-4xl font-bold">
                      <span className="bg-white text-purple-600 px-3 py-1 rounded-lg">
                        Zudo's
                      </span>{" "}
                      Blog
                    </h1>
                  </Link>
                  <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
                  <p className="text-lg text-purple-100 mb-8">
                    Sign in to access your account and continue your journey
                    with us.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>Access to all features</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>Personalized experience</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>Secure and reliable</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Form */}
              <div className="md:w-1/2 p-12">
                <div className="max-w-md mx-auto">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                    Sign In
                  </h2>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <Label
                        value="Email Address"
                        className="text-gray-700 dark:text-gray-300"
                      />
                      <TextInput
                        type="email"
                        placeholder="name@example.com"
                        id="email"
                        onChange={handleChange}
                        className="mt-2"
                        required
                      />
                    </div>
                    <div>
                      <Label
                        value="Password"
                        className="text-gray-700 dark:text-gray-300"
                      />
                      <TextInput
                        type="password"
                        placeholder="••••••••"
                        id="password"
                        onChange={handleChange}
                        className="mt-2"
                        required
                      />
                    </div>
                    <Button
                      gradientDuoTone="purpleToPink"
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 text-lg font-medium transition-all duration-200 hover:shadow-lg"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <Spinner size="sm" />
                          <span className="ml-3">Signing in...</span>
                        </div>
                      ) : (
                        "Sign In"
                      )}
                    </Button>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <OAuth />

                    <div className="text-center mt-6">
                      <span className="text-gray-600 dark:text-gray-400">
                        Don't have an account?{" "}
                      </span>
                      <Link
                        to="/sign-up"
                        className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200"
                      >
                        Sign Up
                      </Link>
                    </div>
                  </form>

                  {errorMessage && (
                    <Alert className="mt-6" color="failure">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errorMessage}
                      </div>
                    </Alert>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
