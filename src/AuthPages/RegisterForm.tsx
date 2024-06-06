import { useMutation } from "@tanstack/react-query";
import { useForm } from "@mantine/form";
import { registerUser } from "../utils/apiAuthClient";
import { RegisterData, AuthResponse } from "../types/dataTypes";
import useAuthStore from "../stores/authStore";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import debug from "debug";

const log = debug("BookVerse:AuthPages:Login");

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuthStore();
  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      role: "reader", //default value need to be specified
    },
  });

  const mutation = useMutation<AuthResponse, Error, RegisterData>({
    mutationFn: registerUser,
    onSuccess: (data: AuthResponse) => {
      setUser(data.user);
      log(data.user);
      setToken(data.token);
      toast.success("Registration successful!");
      navigate("/");
    },
    onError: (error: Error) => {
      toast.error(`Error registering: ${error.message}`);
    },
  });

  const handleSubmit = (values: RegisterData) => {
    mutation.mutate(values);
  };
  const handleClose = () => {
    navigate(-1); // This navigates to the previous page
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>

      <div className="relative z-50 w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src="public/images/logo/icons8-books-100.png"
            alt="BookVerse Logo"
          />
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-yellow-900">
            Become a BookVerse Member!
          </h2>
        </div>

        <form
          onSubmit={form.onSubmit(handleSubmit)}
          className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm"
        >
          <div className="mb-4">
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="username"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                type="text"
                placeholder="Username"
                {...form.getInputProps("username")}
                required
                className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                placeholder="Email"
                {...form.getInputProps("email")}
                required
                className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                placeholder="Password"
                {...form.getInputProps("password")}
                required
                className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
              I am a/an:
            </label>
            <div className="flex items-center">
              <input
                id="reader"
                name="role"
                type="radio"
                value="reader"
                {...form.getInputProps("role")}
                className="custom-radio mr-2 leading-tight"
              />
              <label htmlFor="reader" className="text-gray-700">
                Reader
              </label>
            </div>
            <div className="flex items-center mt-2">
              <input
                id="author"
                name="role"
                type="radio"
                value="author"
                {...form.getInputProps("role")}
                className="custom-radio mr-2 leading-tight"
              />
              <label htmlFor="author" className="text-gray-700">
                Author
              </label>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-teal-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold leading-6 text-teal-600 hover:text-teal-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
