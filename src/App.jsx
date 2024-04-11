import "./App.css";
import Forgot from "./forgot";
import Login from "./login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Otp from "./otp";

// import Loginnew from "./loginnew";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Books from "./pages/books";
import Profile from "./pages/profile";
import Dashboard from "./pages/dashboard";
import Librarian from "./pages/librarian";
import Sidebar from "./component/sidebar";

function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<Forgot />} />
          <Route path="/otp" element={<Otp />} />
          <Route element={<Sidebar />}>
            <Route path="/books" element={<Books />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/librarian" element={<Librarian />} />
          </Route>
          {/* <Route path="/headerbar" element={<Headerbar />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
