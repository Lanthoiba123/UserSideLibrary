import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASEURL } from "../constant";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BiHealth } from "react-icons/bi";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const [userDetails, setUserDetatils] = useState({
    fullName: "",
    registrationNo: "",
    branch: "",
    email: "",
    password: "",
  });

  function handleInput(event) {
    setUserDetatils((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(userDetails);
    const id = toast.loading("Please wait...");
    fetch(`${BASEURL}/api/student`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(userDetails),
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
          navigate("/otp");
        }
        console.log(data);
        setUserDetatils({
          fullName: "",
          email: "",
          password: "",
          registrationNo: "",
          branch: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <FaLock />
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Login" className="btn solid" />
          </form>
          <form action="#" className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <FaUser />
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <BiHealth />
              <input type="text" placeholder="Registration No." />
            </div>
            <div className="input-field">
              <MdEmail />
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-field">
              <FaLock />
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" className="btn" value="Sign up" />
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
