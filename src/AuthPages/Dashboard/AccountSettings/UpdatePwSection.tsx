import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { logoutUser, updatePassword } from "../../../utils/apiAuthClient";
import { UpdatePasswordData } from "../../../types/dataTypes";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/authStore";

const UpdatePwSection = () => {
  const [currPw, setCurrPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const { clearAuth } = useAuthStore();
  const token = useAuthStore.getToken();
  const navigate = useNavigate();

  const mutation = useMutation<void, Error, UpdatePasswordData>({
    mutationFn: (newPasswordData) => updatePassword(newPasswordData, token),
    onSuccess: () => {
      clearAuth(); //logout user
      logoutUser();
      toast.success("Password updated successfully. Please log in again.");
      navigate("/login"); //prompt to re-login w new pw
    },
    onError: (error: Error) => {
      toast.error(`Error updating password: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ currentPassword: currPw, newPassword: newPw });
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="py-2 text-xl font-semibold text-gray-900">
        Update Password
      </p>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-4 sm:space-y-0">
          <label htmlFor="current-password" className="flex-grow">
            <span className="text-sm text-gray-500">Current Password</span>
            <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
              <input
                type="password"
                id="current-password"
                className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="***********"
                value={currPw}
                onChange={(e) => setCurrPw(e.target.value)}
                required
              />
            </div>
          </label>
          <label htmlFor="new-password" className="flex-grow">
            <span className="text-sm text-gray-500">New Password</span>
            <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
              <input
                type="password"
                id="new-password"
                className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="***********"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                required
              />
            </div>
          </label>
        </div>
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white"
        >
          Save Password
        </button>
      </div>
    </form>
  );
};

export default UpdatePwSection;
