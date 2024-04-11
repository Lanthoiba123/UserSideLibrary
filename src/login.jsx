import React, { useEffect, useState } from "react";
import * as Components from "./components";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [signIn, toggle] = useState(true);

  const [userDetails, setUserDetatils] = useState({
    fullName: "",
    registrationNo: "",
    branch: "",
    email: "",
    password: "",
  });

  // const Register = () => {
  //   const [userDetails, setUserDetatils] = useState({
  //     name: "",
  //     registration: "",
  //     branch: "",
  //     email: "",
  //     password:""
  //   });

  //   const [message, setMessage] = useState({
  //     type: "invisible-msg",
  //     text: "empty",
  //   });

  function handleInput(event) {
    setUserDetatils((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }
  //http://localhost:8080/api/student
  function handleSubmit(e) {
    e.preventDefault();
    const id = toast.loading("Please wait...");

    console.log(userDetails);
    fetch("https://library-mtu.vercel.app/api/student", {
      method: "POST",
      body: JSON.stringify(userDetails),
      credentials: "include",
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          toast.update(id, {
            render: "OTP is sent",
            type: "success",
            isLoading: false,
            autoClose: 5000,
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
        if (err) {
          toast.update(id, {
            render: "Error rendering",
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
        }
        console.log(err.message);
        toast.error(err.message);
      });
  }

  //    function handleSubmit(event) {
  //   event.preventDefault();
  //   console.log(userDetails);

  //   fetch("http://localhost:8000/register", {
  //     method: "POST",
  //     body: JSON.stringify(userDetails),
  //     headers: {
  //       "content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setMessage({ type: "Success", text: data.message });
  //       setUserDetatils({
  //         name: "",
  //         email: "",
  //         password: "",
  //         age: "",
  //       });
  //       setTimeout(() => {
  //         setMessage({ type: "invisible-msg", text: "empty" });
  //       }, 3000);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  const [branch, setBranch] = useState([]);
  // // const [email, setBranch] = useState("");

  useEffect(() => {
    const fetchBranch = async () => {
      const res = await fetch("https://library-mtu.vercel.app/api/branch");
      const data = await res.json();
      setBranch(data.data);
    };
    fetchBranch();
  }, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  return (
    <div className="register">
      <Components.Container>
        <Components.SignUpContainer signinin={signIn ? 1 : 0}>
          <Components.Form onSubmit={handleSubmit}>
            <Components.Title>REGISTER</Components.Title>
            <Components.Register>
              Let’s Go To Our Books World
            </Components.Register>
            <Components.Input
              name="fullName"
              required
              onChange={handleInput}
              type="text"
              placeholder="Username"
            />
            <Components.Input
              onChange={handleInput}
              required
              name="registrationNo"
              maxLength={10}
              type="text"
              placeholder="Registration number"
            />
            <Components.Select onChange={handleInput} name="branch">
              <option value="select">Select Branch</option>
              {branch &&
                branch.map((each) => {
                  return (
                    <option key={each._id} value={each._id}>
                      {each.name}
                    </option>
                  );
                })}
            </Components.Select>
            <Components.Input
              onChange={handleInput}
              name="email"
              required
              pattern=".+@mtu\.ac\.in$"
              type="email"
              placeholder="Enter Your MTU email"
            />
            <Components.Input
              onChange={handleInput}
              required
              name="password"
              maxLength={8}
              type="password"
              placeholder="Password"
            />
            <Components.Button>Register Now</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinin={signIn ? 1 : 0}>
          <Components.Form>
            <Components.Title>LOGIN NOW</Components.Title>
            <Components.Register>
              Let’s Go To Our Books World
            </Components.Register>
            <Components.Input
              required
              maxLength={10}
              type="text"
              placeholder="Registration number"
            />
            <Components.Input
              required
              maxLength={8}
              type="password"
              placeholder="Password"
            />
            <Components.Anchor href="forgotPassword">
              Forgot your password?
            </Components.Anchor>
            <Components.Button>Login Now</Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinin={signIn ? 1 : 0}>
          <Components.Overlay signinin={signIn ? 1 : 0}>
            <Components.LeftOverlayPanel signinin={signIn ? 1 : 0}>
              {/* <Components.Title>Welcome Back!</Components.Title> */}
              <Components.Box>
                <Components.Paragraph>
                  Hurry up, Login page is waiting for you to take you to the
                  world of books , Register Now!!!
                </Components.Paragraph>
                <Components.Image src="women.png" />
              </Components.Box>
              <Components.GhostButton onClick={() => toggle(true)}>
                Login Now
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinin={signIn ? 1 : 0}>
              {/* <Components.Title>Hello, Friend!</Components.Title> */}
              <Components.Box2>
                <Components.Paragraph2>
                  You will be excited after seeing the books world and you are
                  waiting for Login, Login Now!!!
                </Components.Paragraph2>
                <Components.Image2 src="women2.png" />
              </Components.Box2>
              <Components.GhostButton onClick={() => toggle(false)}>
                Register Now
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
}

export default Login;
