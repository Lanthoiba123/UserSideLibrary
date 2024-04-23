import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Otp() {
  const [otp, setOtp] = useState(new Array(4).fill(""));

  function handleChange(e, index) {
    if (Number.isNaN(e.target.value)) return false;
    setOtp([
      ...otp.map((data, indx) => (indx === index ? e.target.value : data)),
    ]);
    if (e.target.value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  }
  // Timer

  const [counter, setCounter] = React.useState(59);
  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const navigate = useNavigate();

  const onSubmitOtp = (e) => {
    e.preventDefault();
    console.log(otp);
    const stringOtp = otp.join("");
    console.log(stringOtp);
    const objectOtp = {
      otp: stringOtp,
    };
    fetch("https://library-mtu.vercel.app/api/student/verify", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(objectOtp),
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          navigate("/books");
          // toast("Otp Verified");
        }
      });
  };

  return (
    <div className="otpbody">
      <div className="otp-box">
        <div className="logo1">
          <img
            className="logo"
            src="mtuLogo.png
    "
            alt=""
          />
        </div>
        <div className="verification">
          <p className="otpText">OTP Verification</p>
        </div>
        <div className="verify">
          <p className="otpText2">
            We Will send you a one time password on your MTU email
          </p>
        </div>
        <div className="otp-area">
          {otp.map((data, i) => {
            return (
              <input
                key={i}
                type="text"
                value={data}
                maxLength={1}
                onChange={(e) => handleChange(e, i)}
              />
            );
          })}
        </div>
        <center>
          <span style={{ color: "gray", fontWeight: "100" }}>
            {" "}
            00:{counter}
          </span>
          <div className="otp-not-receive">
            Do not send OTP ? <Link to="/otp">Send OTP</Link>
          </div>
        </center>
        <center>
          <button
            className="otp-button"
            type="submit"
            // onClick={() => alert(otp.join(""))}
            onClick={onSubmitOtp}
          >
            Verify OTP
          </button>
        </center>
      </div>
    </div>
  );
}

export default Otp;
