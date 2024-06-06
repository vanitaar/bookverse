const DeleteAcctSection = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 mb-10">
      <p className="py-2 text-xl font-semibold text-gray-900">Delete Account</p>
      <div className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        Proceed with caution
      </div>
      <p className="mt-2 text-gray-600">
        You will not be able to access/see the reviews you have posted. This
        action is irreversible.
      </p>
      <button className="ml-auto text-sm font-semibold text-rose-600 underline decoration-2">
        Continue with deletion
      </button>
    </div>
  );
};

export default DeleteAcctSection;
