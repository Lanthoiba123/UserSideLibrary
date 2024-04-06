import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 678px;
  max-width: 100%;
  min-height: 450px;
`;

export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${(props) =>
    props.singinin !== true
      ? `
   transform: translateX(100%);
   opacity: 1;
   z-index: 5;
 `
      : null}
`;

export const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${(props) =>
    props.signinin !== true ? `transform: translateX(100%);` : null}
`;

export const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

export const Title = styled.h1`
  font-weight: bold;
  margin: 3px;
`;
export const Register = styled.p`
  margin: 5px 0px 15px 0px;
  font-size: 12px;
`;
export const Title3 = styled.h4`
  font-weight: semi-bold;
  margin: 0;
`;

export const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 10px 15px;
  margin: 8px 0;
  border-radius: 10px;
  width: 100%;
`;

export const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #59d3e6;
  /* background-color: #ff4b2b; */
  background-image: radial-gradient(
      circle at 85% 1%,
      hsla(190, 0%, 93%, 0.05) 0%,
      hsla(190, 0%, 93%, 0.05) 96%,
      transparent 96%,
      transparent 100%
    ),
    radial-gradient(
      circle at 14% 15%,
      hsla(190, 0%, 93%, 0.05) 0%,
      hsla(190, 0%, 93%, 0.05) 1%,
      transparent 1%,
      transparent 100%
    ),
    radial-gradient(
      circle at 60% 90%,
      hsla(190, 0%, 93%, 0.05) 0%,
      hsla(190, 0%, 93%, 0.05) 20%,
      transparent 20%,
      transparent 100%
    ),
    radial-gradient(
      circle at 79% 7%,
      hsla(190, 0%, 93%, 0.05) 0%,
      hsla(190, 0%, 93%, 0.05) 78%,
      transparent 78%,
      transparent 100%
    ),
    radial-gradient(
      circle at 55% 65%,
      hsla(190, 0%, 93%, 0.05) 0%,
      hsla(190, 0%, 93%, 0.05) 52%,
      transparent 52%,
      transparent 100%
    ),
    linear-gradient(135deg, rgb(37, 56, 222), rgb(96, 189, 244));
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  margin: 18px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
  &:hover {
    background-image: radial-gradient(
        circle at 40% 91%,
        rgba(251, 251, 251, 0.04) 0%,
        rgba(251, 251, 251, 0.04) 50%,
        rgba(229, 229, 229, 0.04) 50%,
        rgba(229, 229, 229, 0.04) 100%
      ),
      radial-gradient(
        circle at 66% 97%,
        rgba(36, 36, 36, 0.04) 0%,
        rgba(36, 36, 36, 0.04) 50%,
        rgba(46, 46, 46, 0.04) 50%,
        rgba(46, 46, 46, 0.04) 100%
      ),
      radial-gradient(
        circle at 86% 7%,
        rgba(40, 40, 40, 0.04) 0%,
        rgba(40, 40, 40, 0.04) 50%,
        rgba(200, 200, 200, 0.04) 50%,
        rgba(200, 200, 200, 0.04) 100%
      ),
      radial-gradient(
        circle at 15% 16%,
        rgba(99, 99, 99, 0.04) 0%,
        rgba(99, 99, 99, 0.04) 50%,
        rgba(45, 45, 45, 0.04) 50%,
        rgba(45, 45, 45, 0.04) 100%
      ),
      radial-gradient(
        circle at 75% 99%,
        rgba(243, 243, 243, 0.04) 0%,
        rgba(243, 243, 243, 0.04) 50%,
        rgba(37, 37, 37, 0.04) 50%,
        rgba(37, 37, 37, 0.04) 100%
      ),
      linear-gradient(90deg, rgb(34, 222, 237), rgb(135, 89, 215));
    cursor: pointer;
  }
`;
export const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
  margin-top: 2rem;
`;

export const Anchor = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;
export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${(props) =>
    props.signinin !== true ? `transform: translateX(-100%);` : null}
`;

export const Overlay = styled.div`
  /* background: #ff416c;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
  background: linear-gradient(to right, #ff4b2b, #ff416c); */
  background-image: radial-gradient(
      circle at 67% 83%,
      hsla(317, 0%, 96%, 0.05) 0%,
      hsla(317, 0%, 96%, 0.05) 1%,
      transparent 1%,
      transparent 5%,
      transparent 5%,
      transparent 100%
    ),
    radial-gradient(
      circle at 24% 80%,
      hsla(317, 0%, 96%, 0.05) 0%,
      hsla(317, 0%, 96%, 0.05) 27%,
      transparent 27%,
      transparent 63%,
      transparent 63%,
      transparent 100%
    ),
    radial-gradient(
      circle at 23% 5%,
      hsla(317, 0%, 96%, 0.05) 0%,
      hsla(317, 0%, 96%, 0.05) 26%,
      transparent 26%,
      transparent 82%,
      transparent 82%,
      transparent 100%
    ),
    radial-gradient(
      circle at 21% 11%,
      hsla(317, 0%, 96%, 0.05) 0%,
      hsla(317, 0%, 96%, 0.05) 35%,
      transparent 35%,
      transparent 45%,
      transparent 45%,
      transparent 100%
    ),
    radial-gradient(
      circle at 10% 11%,
      hsla(317, 0%, 96%, 0.05) 0%,
      hsla(317, 0%, 96%, 0.05) 21%,
      transparent 21%,
      transparent 81%,
      transparent 81%,
      transparent 100%
    ),
    radial-gradient(
      circle at 19% 61%,
      hsla(317, 0%, 96%, 0.05) 0%,
      hsla(317, 0%, 96%, 0.05) 20%,
      transparent 20%,
      transparent 61%,
      transparent 61%,
      transparent 100%
    ),
    radial-gradient(
      circle at 13% 77%,
      hsla(317, 0%, 96%, 0.05) 0%,
      hsla(317, 0%, 96%, 0.05) 63%,
      transparent 63%,
      transparent 72%,
      transparent 72%,
      transparent 100%
    ),
    radial-gradient(
      circle at 30% 93%,
      hsla(317, 0%, 96%, 0.05) 0%,
      hsla(317, 0%, 96%, 0.05) 33%,
      transparent 33%,
      transparent 82%,
      transparent 82%,
      transparent 100%
    ),
    linear-gradient(90deg, rgb(22, 176, 207), rgb(103, 7, 215));
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${(props) => (props.signinin !== true ? `transform: translateX(50%);` : null)}
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${(props) => (props.signinin !== true ? `transform: translateX(0);` : null)}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${(props) => (props.signinin !== true ? `transform: translateX(20%);` : null)}
`;
export const Box = styled.div`
  /* margin: 15px 10px 30px 10px; */
  padding: 45px 10px 47px 20px;
  background-color: rgba(134, 135, 226, 0.58);
  border: 1px solid rgba(255, 255, 255, 0.5);
  /* backdrop-filter: blur(20px) saturate(110%); */
  position: relative;
  border-radius: 30px;
`;
export const Box2 = styled.div`
  /* margin: 15px 10px 30px 10px; */
  padding: 40px 95px 47px 10px;
  background-color: rgba(134, 135, 226, 0.58);
  border: 1px solid rgba(255, 255, 255, 0.5);
  /* backdrop-filter: blur(20px) saturate(110%); */
  position: relative;
  border-radius: 30px;
`;
export const Image = styled.img`
  width: 350px;
  height: 220px;
  position: absolute;
  top: 0px;
  left: -70px;
`;
export const Image2 = styled.img`
  width: 350px;
  height: 220px;
  position: absolute;
  top: 0px;
  left: -25px;
`;
export const Paragraph = styled.p`
  font-weight: 500;
  font-size: 14px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  line-height: 20px;
  letter-spacing: 0.5px;
  /* margin: 20px 0 30px; */
  margin-left: 80px;
  float: left;
  /* position: absolute; */
`;
export const Paragraph2 = styled.p`
  font-weight: 500;
  /* font-size: 14px; */
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  line-height: 20px;
  letter-spacing: 0.5px;
  /* margin: 20px 0 30px; */

  /* position: absolute; */
`;
