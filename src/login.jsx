import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASEURL } from "../constant.js";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BiHealth } from "react-icons/bi";
import { Select } from "@mantine/core";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const [userDetails, setUserDetatils] = useState({
    fullName: "",
    registrationNo: "",
    email: "",
    password: "",
  });
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [role, setRole] = useState("");
  const [userBranch, setUserBranch] = useState("");

  // useEffect(() => {
  //   console.log(role);
  // }, [role]);

  const handleLoginDetails = (e) => {
    setLoginDetails((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  function handleInput(event) {
    setUserDetatils((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }
  const emailPattern = /^[a-zA-Z0-9._%+-]+@mtu\.ac\.in$/;

  function isEmailValid(email) {
    return emailPattern.test(email);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(userDetails);
    const id = toast.loading("Please wait...");
    if (!isEmailValid(userDetails.email)) {
      toast.update(id, {
        render: "Email is not valid",
        type: "error",
        isLoading: false,
        duration: 2000,
      });
      return;
    }

    console.log({ ...userDetails, role, branch: userBranch });
    fetch(`${BASEURL}/api/student`, {
      method: "POST",
      // credentials: "include",
      body: JSON.stringify({ ...userDetails, role, branch: userBranch }),
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          toast.update(id, {
            render: "All is good",
            type: "success",
            isLoading: false,
          });
          window.localStorage.setItem("isLoggedIn", true);
          window.localStorage.setItem("token", data.token);

          navigate("/otp");
        } else {
          toast.update(id, {
            render: data.err,
            type: "error",
            isLoading: false,
            duration: 2000,
          });
        }
        console.log(data);
        setUserDetatils({
          fullName: "",
          email: "",
          password: "",
          registrationNo: "",
        });
      })

      .catch((err) => {
        console.log(err);
      });
  }

  const loginSubmit = (e) => {
    e.preventDefault();
    console.log(loginDetails);
    const id = toast.loading("Please wait...");
    fetch(`${BASEURL}/api/student/login`, {
      method: "POST",
      // credentials: "include",
      body: JSON.stringify(loginDetails),
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //library-mtu.vercel.app
        if (data.success) {
          toast.update(id, {
            render: "All is good",
            type: "success",
            isLoading: false,
            duration: 2000,
          });
          window.localStorage.setItem("isLoggedIn", true);
          window.localStorage.setItem("token", data.token);
          window.location.reload();
        } else {
          toast.update(id, {
            render: data.err,
            type: "error",
            isLoading: false,
            duration: 2000,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const [branch, setBranch] = useState([]);
  // // const [email, setBranch] = useState("");

  useEffect(() => {
    const fetchBranch = async () => {
      const res = await fetch(`${BASEURL}/api/branch`);
      const data = await res.json();
      setBranch(data.data);
    };
    fetchBranch();
  }, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };
  const [signInMode, setSignInMode] = useState(true);
  return (
    <div className={`container ${signInMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <FaUser />
              <input
                type="text"
                name="email"
                onChange={handleLoginDetails}
                placeholder="email"
              />
            </div>
            <div className="input-field">
              <FaLock />
              <input
                type="password"
                name="password"
                onChange={handleLoginDetails}
                placeholder="Password"
              />
            </div>
            <button type="submit" onClick={loginSubmit} className="btn solid">
              Login
            </button>
          </form>
          <form onSubmit={handleSubmit} className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <FaUser />
              <input
                type="text"
                name="fullName"
                onChange={handleInput}
                placeholder="Username"
              />
            </div>
            <div className="input-field">
              <BiHealth />
              <input
                type="text"
                name="registrationNo"
                onChange={handleInput}
                placeholder="Registration No."
              />
            </div>
            {/* <select
              className="input-field w-4/5"
              name="branch"
              onChange={handleInput}
              id=""
            >
              <option value="" className="text-slate-100 text-left w-3/4">
                Select Branch
              </option>
              {branch.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select> */}

            <Select
              className="w-[370px]  mb-4 "
              radius="xl"
              size="md"
              placeholder="Select Branch"
              data={branch.map((branch) => ({
                value: branch._id,
                label: branch.name,
              }))}
              value={branch ? branch.value : null}
              onChange={(_value, option) => setUserBranch(option.value)}
            />
            <Select
              className="w-[370px] "
              radius="xl"
              size="md"
              placeholder="Pick student/teacher"
              data={["Student", "Teacher"]}
              value={role}
              onChange={setRole}
            />
            <div className="input-field">
              <MdEmail />
              <input
                type="email"
                name="email"
                onChange={handleInput}
                placeholder="Email"
              />
            </div>
            <div className="input-field">
              <FaLock />
              <input
                type="password"
                name="password"
                onChange={handleInput}
                placeholder="Password"
              />
            </div>
            <button type="submit" onClick={handleSubmit} className="btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button
              className="btn transparent"
              type="button"
              onClick={() => setSignInMode(true)}
              id="sign-up-btn"
            >
              Sign up
            </button>
          </div>
          <img src="/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button
              onClick={() => setSignInMode(false)}
              type="button"
              className="btn transparent"
              id="sign-in-btn"
            >
              Sign in
            </button>
          </div>
          <img src="/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
