import useAuthStore from "../../stores/authStore";
import { AuthorDashboard } from "./Author/AuthorDashboard";
import { ReaderDashboard } from "./Reader/ReaderDashboard";

const DashboardPage: React.FC = (): JSX.Element => {
  const { user } = useAuthStore();

  return user?.role === "author" ? <AuthorDashboard /> : <ReaderDashboard />;

  //   return (
  //     // <div className="mt-20">
  //     //   <h1>Welcome to your DashboardPage</h1>
  //     // </div>
  //   );
};

export default DashboardPage;
