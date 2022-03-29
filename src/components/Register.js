import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Register(props) {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const onUsernameChangeHandler = (event) => {
    const un = event.target.value;
    if (un.length === 0) {
      console.log("Enter valid username");
    } else {
      setUsername(un);
    }
  };

  const onEmailIdChangeHandler = (event) => {
    const email = event.target.value;
    if (email.length === 0) {
      console.log("Enter valid email");
    } else {
      setEmailId(email);
    }
  };

  const onPasswordChangeHandler = (event) => {
    const pswd = event.target.value;
    if (pswd.length === 0) {
      console.log("Enter valid password");
    } else {
      setPassword(pswd);
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const registerForm = {
      username: username,
      email: emailId,
      password: password,
    };
    console.log(registerForm);
    axios
      .post("http://dct-user-auth.herokuapp.com/users/register", registerForm)
      .then((response) => {
        const result = response.data;
        console.log("Result: " + result);
        if (result.hasOwnProperty("errors")) {
         alert(result.message);
        } else {
          console.log("User registered successfully");
          history.push({pathname:'/login', message:{successMsg: "User registered successfully"}})
          setEmailId("");
          setPassword("");
          setUsername("");
        }
      })
      .catch((error) => {
        console.log("Error: " + error.message);
      });
  };
  return (
    <div>
      <h1>Register with us</h1>
      <form onSubmit={onSubmitHandler}>
        <input
          id="username"
          type="text"
          onChange={onUsernameChangeHandler}
          value={username}
          placeholder="Enter username"
        ></input>
        <br />
        <input
          id="emailid"
          type="text"
          onChange={onEmailIdChangeHandler}
          value={emailId}
          placeholder="Enter email id"
        ></input>
        <br />
        <input
          id="password"
          type="text"
          onChange={onPasswordChangeHandler}
          value={password}
          placeholder="Enter password"
        ></input>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
