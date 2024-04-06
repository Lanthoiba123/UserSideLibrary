import "./App.css";
import Forgot from "./forgot";
import Login from "./login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Otp from "./otp";
// import Loginnew from "./loginnew";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<Forgot />} />
          <Route path="/otp" element={<Otp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
