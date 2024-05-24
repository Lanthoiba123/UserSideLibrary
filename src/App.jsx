// import "./App.css";
import Forgot from "./forgot";
import Login from "./login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Otp from "./otp";
import { useState } from "react";

// import Loginnew from "./loginnew";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Books from "./pages/books";
import Profile from "./pages/profile";
import Dashboard from "./pages/dashboard";
import Librarian from "./pages/librarian";
import Sidebar from "./component/sidebar";
import Bookrequest from "./pages/bookrequest";

import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const isloggedIn = window.localStorage.getItem("token");

  return (
    <MantineProvider>
      <ToastContainer autoClose={4000} />
      <BrowserRouter>
        <Routes>
          {isloggedIn ? (
            <Route element={<Sidebar setIsOpen={setIsOpen} isOpen={isOpen} />}>
              <Route
                path="/"
                element={<Books setIsOpen={setIsOpen} isOpen={isOpen} />}
              />
              <Route
                path="/profile"
                element={<Profile setIsOpen={setIsOpen} isOpen={isOpen} />}
              />
              <Route
                path="/dashboard"
                element={<Dashboard setIsOpen={setIsOpen} isOpen={isOpen} />}
              />
              <Route
                path="/librarian"
                element={<Librarian setIsOpen={setIsOpen} isOpen={isOpen} />}
              />
              <Route
                path="/bookrequest"
                element={<Bookrequest setIsOpen={setIsOpen} isOpen={isOpen} />}
              />
            </Route>
          ) : (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgotPassword" element={<Forgot />} />
              <Route path="/otp" element={<Otp />} />
            </>
          )}

          {/* <Route path="/headerbar" element={<Headerbar />} /> */}
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
