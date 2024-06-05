import debug from "debug";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import LandingPage from "./LandingPage/LandingPage";
import { RegisterForm } from "./AuthPages/RegisterForm";
import { LoginForm } from "./AuthPages/LoginForm";
const log = debug("BookVerse:App");

function App() {
  log("in App");
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </>
  );
}

export default App;
