import { useMutation } from "@tanstack/react-query";
import { useForm } from "@mantine/form";
import { registerUser } from "../utils/apiAuthClient";
import { RegisterData, AuthResponse } from "../types/dataTypes";
import useAuthStore from "../stores/authStore";
import toast from "react-hot-toast";

const RegisterForm: React.FC = () => {
  const { setUser, setToken } = useAuthStore();
  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      role: "reader", // default role
    },
  });

  const mutation = useMutation<AuthResponse, Error, RegisterData>({
    mutationFn: registerUser,
    onSuccess: (data: AuthResponse) => {
      setUser(data.user);
      setToken(data.token);
      toast.success("Registration successful!");
    },
    onError: (error: Error) => {
      toast.error(`Error registering: ${error.message}`);
    },
  });

  const handleSubmit = (values: RegisterData) => {
    mutation.mutate(values);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            {...form.getInputProps("username")}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            {...form.getInputProps("email")}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            {...form.getInputProps("password")}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Register as
          </label>
          <div className="flex items-center">
            <input
              id="reader"
              name="role" // Same name for both radio buttons
              type="radio"
              value="reader"
              {...form.getInputProps("role")}
              className="mr-2 leading-tight"
            />
            <label htmlFor="reader" className="text-gray-700">
              Reader
            </label>
          </div>
          <div className="flex items-center mt-2">
            <input
              id="author"
              name="role" // Same name for both radio buttons
              type="radio"
              value="author"
              {...form.getInputProps("role")}
              className="mr-2 leading-tight"
            />
            <label htmlFor="author" className="text-gray-700">
              Author
            </label>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
