import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Login(props) {
  const history =useHistory()
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const onEmailIdChangeHolder = (event) => {
    setEmailId(event.target.value);
  };
  const onPasswordChangeHolder = (event) => {
    setPassword(event.target.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const loginForm = {
      email: emailId,
      password: password,
    };
    axios
      .post("http://dct-user-auth.herokuapp.com/users/login", loginForm)
      .then((response) => {
        const result = response.data;
        console.log("Token: " + result.token);
        if (response.data.hasOwnProperty("errors")) {
          alert(result.message);
        } else {
          console.log("User logged in successfully");
          localStorage.setItem('token',result.token);
          props.userLogged1(true)
          history.push('/')
        }
      })
      .catch((error) => {
        console.log("Error: " + error.message);
      });
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmitHandler}>
        <input
          id="emailid"
          type="text"
          onChange={onEmailIdChangeHolder}
          value={emailId}
          placeholder="Enter email id"
        ></input>
        <br />
        <input
          id="password"
          type="text"
          onChange={onPasswordChangeHolder}
          value={password}
          placeholder="Enter password"
        ></input>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
