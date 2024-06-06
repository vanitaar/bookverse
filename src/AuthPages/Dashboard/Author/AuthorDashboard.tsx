import { useState } from "react";
import AccountSettings from "../AccountSettings";
import { MyBooklistTab } from "./MyBooklistTab";
import MyStatusTab from "./MyStatusTab";
import MyBioTab from "./MyBioTab";

// Define a type for the tabs
type Tab = "settingsTab" | "booklistTab" | "statusTab" | "bioTab";

export const AuthorDashboard = () => {
  //   return (
  //     <div className="mt-20">
  //       <h1>Welcome to the Author's Dashboard!</h1>
  //     </div>
  //   );
  // eslint-disable-next-line no-unused-vars
  const [activeTab, setActiveTab] = useState("settingsTab");
  //for dropdown on narrower screens
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleTabSelection = (tab: Tab) => {
    setActiveTab(tab);
    setIsDropdownOpen(false);
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case "settingsTab":
        return <AccountSettings />;
      case "booklistTab":
        return <MyBooklistTab />;
      case "statusTab":
        return <MyStatusTab />;
      case "bioTab":
        return <MyBioTab />;
      default:
        return <AccountSettings />;
    }
  };

  const getTabClassName = (tab: Tab) => {
    return `mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold transition ${
      activeTab === tab
        ? "border-l-indigo-600 text-indigo-600"
        : "border-transparent text-gray-600"
    } hover:border-l-indigo-800 hover:text-indigo-800`;
  };

  return (
    <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
      <h1 className="border-b py-6 text-4xl font-semibold text-gray-900">
        Author's Dashboard
      </h1>
      <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
        <div className="relative my-4 w-56 sm:hidden">
          <input
            className="peer hidden"
            type="checkbox"
            name="select-1"
            id="select-1"
            checked={isDropdownOpen}
            onChange={() => setIsDropdownOpen(!isDropdownOpen)}
          />
          <label
            htmlFor="select-1"
            className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring"
          >
            {activeTab === "settingsTab" ? "Account Settings" : "My Booklist"}
          </label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <ul className="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
            <li
              className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-red-300 hover:text-gray"
              onClick={() => handleTabSelection("settingsTab")}
            >
              Account Settings
            </li>
            <li
              className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-red-300 hover:text-gray"
              onClick={() => handleTabSelection("booklistTab")}
            >
              My Booklist
            </li>

            <li
              className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-red-300 hover:text-gray"
              onClick={() => handleTabSelection("statusTab")}
            >
              My Status
            </li>
            <li
              className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-red-300 hover:text-gray"
              onClick={() => handleTabSelection("bioTab")}
            >
              My Bio
            </li>
          </ul>
        </div>

        <div className="col-span-2 hidden sm:block">
          <ul>
            <li
              className={getTabClassName("settingsTab")}
              onClick={() => handleTabSelection("settingsTab")}
            >
              Account Settings
            </li>
            <li
              className={getTabClassName("booklistTab")}
              onClick={() => handleTabSelection("booklistTab")}
            >
              My Booklist
            </li>
            <li
              className={getTabClassName("statusTab")}
              onClick={() => handleTabSelection("statusTab")}
            >
              My Status
            </li>
            <li
              className={getTabClassName("bioTab")}
              onClick={() => handleTabSelection("bioTab")}
            >
              My Bio
            </li>
          </ul>
        </div>

        <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};
