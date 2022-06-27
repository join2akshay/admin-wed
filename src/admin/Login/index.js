import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from 'react-router-dom';
import { Axios } from "../../actions/utils";
import './style.css'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "@mui/material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Login() {
  // React States
  let navigate = useNavigate();

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uName, setuName] = useState('');
  const [pass, setPass] = useState('');


  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    const auth = getAuth();
    // var { uname, pass } = document.forms[0];
    console.log(uName)
    console.log(pass)


    signInWithEmailAndPassword(auth, uName, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user)
        const idToken = user.stsTokenManager.accessToken
        Axios.post('/auth/singin', { idToken })
          .then((response) => {
            // const payload = {
            //   user: response.data.user,
            //   token: response.data.token,
            // };
            // localStorage.setItem('token', response.data.token)
            navigate('/category')
            toast.success('Logged In');


          }).catch((err) => {
            console.log(err);
          });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
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
      <div >
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required onClick={(e)=>setuName(e.target.value)}/>
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required onClick={(e) => setPass(e.target.value)} />
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
    </div>
  );
}

export default Login;
