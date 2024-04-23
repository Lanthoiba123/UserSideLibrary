import { useEffect, useState } from "react";
import * as Components from "./components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASEURL } from "../constant";

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

  return (
    <div className="register">
      <Components.Container>
        <Components.SignUpContainer signinin={signIn}>
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
              {branch?.map((each) => {
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

        <Components.SignInContainer signinin={signIn}>
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

        <Components.OverlayContainer signinin={signIn}>
          <Components.Overlay signinin={signIn}>
            <Components.LeftOverlayPanel signinin={signIn}>
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

            <Components.RightOverlayPanel signinin={signIn}>
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
