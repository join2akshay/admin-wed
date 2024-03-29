import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../actions/utils";
import "./style.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import Loader from "../Loader";

function Login() {
  // React States
  let navigate = useNavigate();

  const [errorMessages, setErrorMessages] = useState({});
  const [err, setErr] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [uName, setuName] = useState("");
  const [pass, setPass] = useState("");

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1",
    },
    {
      username: "user2",
      password: "pass2",
    },
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const handleSubmit = (event) => {
    setLoading(true)
    //Prevent page reload
    event.preventDefault();
    const auth = getAuth();
    // var { uname, pass } = document.forms[0];
    console.log(uName);
    console.log(pass);
    setErr('');
    signInWithEmailAndPassword(auth, uName, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        const idToken = user.stsTokenManager.accessToken;
        Axios.post("/auth/singin", { idToken })
          .then((response) => {
            localStorage.setItem('ltk', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            setLoading(false)
            navigate("/category");
            toast.success("Logged In");
          })
          .catch((err) => {
            setLoading(false)
            toast.error(err)
            console.log(err);
          });
        // ...
      })
      .catch((error) => {
        setLoading(false)
        setErr(error.message);
      });

    // Find user login info
    // const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    // if (userData) {
    //   if (userData.password !== pass.value) {
    //     // Invalid password
    //     setErrorMessages({ name: "pass", message: errors.pass });
    //   } else {
    //     navigate("/category");

    //     setIsSubmitted(true);
    //   }
    // } else {
    //   // Username not found
    //   setErrorMessages({ name: "uname", message: errors.uname });
    // }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <div>
        <div className="error">{err}</div>
        <div className="input-container">
          <label>Username </label>
          <input
            type="text"
            name="uname"
            required
            onChange={(e) => setuName(e.target.value)}
          />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            type="password"
            name="pass"
            required
            onChange={(e) => setPass(e.target.value)}
          />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          {/* <input type="submit" /> */}
          <Button className="button-container" onClick={handleSubmit}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="login">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
      {
        loading &&
        <Loader/>
     
      }
    </div>
  );
}

export default Login;
