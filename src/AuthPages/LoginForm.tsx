import { useMutation } from "@tanstack/react-query";
import { useForm } from "@mantine/form";
import { loginUser } from "../utils/apiAuthClient";
import { LoginData, AuthResponse } from "../types/dataTypes";
import useAuthStore from "../stores/authStore";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import debug from "debug";

const log = debug("BookVerse:AuthPages:Login");

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, setToken } = useAuthStore();

  const from = location.state?.from || "/";

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });

  const mutation = useMutation<AuthResponse, Error, LoginData>({
    mutationFn: loginUser,
    onSuccess: (data: AuthResponse) => {
      setUser(data.user);
      log(data.user);
      setToken(data.token);
      log(data.token);
      toast.success("Login successful!");
      // navigate("/dashboard");
      const redirectUrl = from.includes("author")
        ? `${from}` //redirect to authorbookpage (!loggedIn --> clickWatchSeries)
        : `/dashboard`; // default
      navigate(redirectUrl, { replace: true });
    },
    onError: (error: Error) => {
      toast.error(`Error logging in: ${error.message}`);
    },
  });

  const handleSubmit = (values: LoginData) => {
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
            src="src/assets/images/logo/icons8-books-100.png"
            alt="BookVerse Logo"
          />
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-yellow-900">
            Welcome Back to BookVerse!
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
                type="username"
                placeholder="Username"
                {...form.getInputProps("username")}
                required
                className="block w-full px-3 rounded-md border-0 py-1.5 text-white bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
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
                className="block w-full px-3 rounded-md border-0 py-1.5 text-white bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-teal-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold leading-6 text-teal-600 hover:text-teal-500"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
