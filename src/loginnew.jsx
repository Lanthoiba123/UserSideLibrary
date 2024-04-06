import React from "react";
// import { Link } from "react-router-dom";

function Loginnew() {
  const [signIn, toggle] = React.useState(true);
  return (
    <div className="container">
      <div className="signUpContainer">
        <form className="form">
          <h1 className="title">Create Account</h1>
          <input
            className="inp"
            type="text"
            // onChange={handleInput}
            required
            placeholder="Username"
            // name="name"
            // value={userDetails.name}
          />
          <input
            className="inp"
            type="text"
            // onChange={handleInput}
            required
            maxLength={10}
            placeholder="Registration number"
            name="age"
            // value={userDetails.age}
          />
          <input
            className="inp"
            type="text"
            // onChange={handleInput}
            required
            placeholder="Branch"
            // name="name"
            // value={userDetails.name}
          />
          <input
            className="inp"
            type="email"
            // onChange={handleInput}
            required
            pattern=".+@mtu\.ac\.in$"
            placeholder="Enter your mtu email"
            name="email"
            // value={userDetails.email}
          />
          <input
            className="inp"
            type="password"
            // onChange={handleInput}
            required
            maxLength={8}
            placeholder="Enter password"
            name="password"
            // value={userDetails.password}
          />
          <button className="btn">Register Now</button>
        </form>
      </div>
      <div className="signInContainer">
        <form className="form">
          <h1 className="title">Join</h1>
          <input
            className="inp"
            type="text"
            required
            maxLength={10}
            // onChange={handleInput}
            placeholder="Registration number"
            // name="email"
            // value={userCreds.email}
          />
          <input
            className="inp"
            type="text"
            required
            maxLength={8}
            // onChange={handleInput}
            placeholder="Enter password"
            // name="password"
            // value={userCreds.password}
          />
          <button className="btn">Login Now</button>
          <p>{/* <Link to="/register">Register now</Link> */}</p>
        </form>
      </div>
      <div className="overlayContainer">
        <div className="overlay">
          <div className="leftOverlayPanel">
            <p>
              Hurry up, Login page is waiting for you to take you to the world
              of books , Register Now!!!
            </p>
            <button
              onClick={() => {
                toggle(false);
              }}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginnew;
