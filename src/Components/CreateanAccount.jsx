import "./CreateanAccount.css";
import React from 'react'
import Logo from "./Assets/GlobalTweet.jpg";
import { useNavigate } from "react-router-dom";
import { AxiosInstance } from "./AxiosInstance";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';



function CreateanAccount() {
  const navigate = useNavigate();

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
        // toast.success('Account created Successfully', { position: toast.POSITION.TOP_CENTER });
      }
    } catch (error) {
      // toast.error('Error', { position: toast.POSITION.TOP_CENTER });
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
