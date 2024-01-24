import React from "react";
import "./Signin.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { AxiosInstance } from "./AxiosInstance";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "./Firebase";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useSnackbar } from "notistack";

function Signin() {
  const [_, setcookie] = useCookies(["cookies"]);
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const Signin = async (e) => {
    e.preventDefault();

    const email = e.target.username.value;
    const password = e.target.password.value;

    try {
      const response = await AxiosInstance.post(
        "/api/user/",

        {
          email: email,
          password: password,
        }
      );
      console.log(response?.data?.rest);
      if (response.data.status === "user_success") {
        setcookie("cookies", response.data.data);
        const userObj=response?.data?.rest
        localStorage.setItem("user",JSON.stringify(userObj))
        enqueueSnackbar('login successfull');
        navigate("/home");
      }
      if(response.data.status==="admin_success"){
        setcookie("cookies", response.data.data);
        enqueueSnackbar('login successfull')
        navigate("/admindash");

      }
    } catch (error) {
      enqueueSnackbar('login failed')
      console.error(error);
    }
  };

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
    } catch (error) {
      console.log("Could not sign in with google", error);
    }
  };

  return (
    <div className="container">
      <div className="Signin">
        <h1 className="SignintoGlobalTweet"> Sign in to GlobalTweet </h1>
        <button className="SigninwithGoogle" onClick={handleGoogleClick}>
          {" "}
          Sign in with Google{" "}
        </button>
        <button className="SigninwithApple"> Sign in with Apple </button>
        <div className="hr-main">
          <div className="hr1"></div>
          <div className="hr2">or</div>
          <div className="hr3"></div>
        </div>{" "}
        <br />
        <br />
        <form action="" onSubmit={Signin}>
          <div>
            <input
              className="input1"
              type="text"
              placeholder="Email/username"
              id="username"
            />{" "}
            <br />
            <br />
          </div>
         
          <div>
            <input
              className="input2"
              type="password"
              placeholder="Password"
              id="password"
            />{" "}
            <br />
            <br />
          </div>

          <div>
            <button className="signinbutton" type="submit">
              Sign In
            </button>
          </div>
          <div>
            <button
              onClick={() => navigate("/createanaccount")}
              className="CreateanAccount"
            >
              {" "}
              Create an Account{" "}
            </button>
          </div>
          <footer className="footer">
            <a href="foote">Forgot Password?...</a>
          </footer>
        </form>
      </div>
    </div>
  );
}

export default Signin;
