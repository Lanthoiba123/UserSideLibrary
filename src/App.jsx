import "./App.css";
import Forgot from "./forgot";
import Login from "./login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Otp from "./otp";
import Book from "./Book";
// import Loginnew from "./loginnew";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

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
          <Route path="/book" element={<Book />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
