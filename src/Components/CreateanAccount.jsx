import "./CreateanAccount.css";
import React from 'react'
import Logo from "./Assets/GlobalTweet.jpg";
import { useNavigate } from "react-router-dom";
import { AxiosInstance } from "./AxiosInstance";
import { useSnackbar } from "notistack";




function CreateanAccount() {
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const Register = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const mobile = e.target.mobile.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    try {
      const response = await AxiosInstance.post(
        "/api/user/createanaccount",
        {
          name: name,
          email: email,
          mobile: mobile,
          username: username,
          password: password,
        }
      );

      if (response.data.status === "success") {
        navigate("/");
        enqueueSnackbar('registration successfull')
      }
    } catch (error) {
      enqueueSnackbar('registration failed')
      
      console.error(error);
    }
  };

  return (
    <div className="CreateanAccountcontainer">
      <div className="CreateanAccountnew">
        <img className="GlobalTweetimage" src={Logo} />

        <form action="" onSubmit={Register}>
          <div>
            <p> Sign up here,</p>
            <input className="Name" type="text" placeholder="Name" id="name"/> <br />
            <br />
          </div>

          <div>
            <input className="Email" type="email" placeholder="Email" id="email"/> <br />
            <br />
          </div>

          <div>
            <input
              className="Mobile"
              type="number"
              placeholder="Mobile Number"
              id="mobile"
            />{" "}
            <br />
            <br />
          </div>

          <div>
            <input className="Username" type="text" placeholder="Username" id="username"/>{" "}
            <br />
            <br />
          </div>

          <div>
            <input
              className="Password"
              type="password"
              placeholder="Password"
              id="password"
            />{" "}
            <br />
            <br />
          </div>

          <div>
            <button className="CreateanAccount" type="submit">
              Create an Account
            </button>
          </div>
          <div>
            <p>
              {" "}
              Already have an Account?{" "}
              <a onClick={() => navigate("/")} href="">
                Signin
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateanAccount;
