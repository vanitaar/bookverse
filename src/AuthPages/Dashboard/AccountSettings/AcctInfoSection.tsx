import useAuthStore from "../../../stores/authStore";

const AcctInfoSection = () => {
  const { user } = useAuthStore();

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
      <p className="py-2 text-xl font-semibold text-gray-900">
        Account Information
      </p>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <p className="text-gray-600">
          Your email address is <strong>{user?.email}</strong>
        </p>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <p className="text-gray-600">
          Your username is <strong>{user?.username}</strong>
        </p>
        {/* <button className="inline-flex text-sm font-semibold text-indigo-600 underline decoration-2">
          Change username
        </button> */}
      </div>
    </div>
  );
};

export default AcctInfoSection;
