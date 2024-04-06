import React from "react";
import * as Components from "./components";
// import { Link, useNavigate } from "react-router-dom";
function Login() {
  const [signIn, toggle] = React.useState(true);
  return (
    <div className="register">
      <Components.Container>
        <Components.SignUpContainer signinin={signIn}>
          <Components.Form>
            <Components.Title>REGISTER</Components.Title>
            <Components.Register>
              Let’s Go To Our Books World
            </Components.Register>
            <Components.Input required type="text" placeholder="Username" />
            <Components.Input
              required
              maxLength={10}
              type="text"
              placeholder="Registration number"
            />
            <Components.Input required type="text" placeholder="Branch" />
            <Components.Input
              required
              pattern=".+@mtu\.ac\.in$"
              type="email"
              placeholder="Enter Your MTU email"
            />
            <Components.Input
              required
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
            <Components.LeftOverlayPanel signinIn={signIn}>
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
