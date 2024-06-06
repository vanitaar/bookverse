import AcctInfoSection from "./AcctInfoSection";
import DeleteAcctSection from "./DeleteAcctSection";
import UpdatePwSection from "./UpdatePwSection";

const AccountSettings = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
      <div className="pt-4">
        <h1 className="py-2 text-2xl font-semibold text-gray-900">
          Account Settings
        </h1>
      </div>
      <hr className="mt-4 mb-8" />
      <AcctInfoSection />
      <hr className="mt-4 mb-8" />
      <UpdatePwSection />
      <hr className="mt-4 mb-8" />
      <DeleteAcctSection />
    </div>
  );
};

export default AccountSettings;
