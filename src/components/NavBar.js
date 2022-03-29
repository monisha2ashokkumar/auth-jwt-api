import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Account from "./Account";
import { Fragment } from "react";
import { Redirect } from "react-router-dom";

export default function NavBar(props) {
  const userLoggedInHandler =(status)=>{
        props.toggle(status)
  }
  const onLogoutHandler = () =>{
    localStorage.removeItem('token')
    props.toggle(false)
  }
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!props.userLoggedInStatus ? (
          <Fragment>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li>
              <Link to="/account">Account</Link>
            </li>
            <li>
              <Link to="/logout" onClick={onLogoutHandler}>Log Out</Link>
            </li>
          </Fragment>
        )}
      </ul>

      <br />
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login" >
        <Login userLogged1={userLoggedInHandler} {...props}/>
      </Route>
      <Route path="/account">
        <Account />
      </Route>
      <Route path="/logout">
        <Redirect to='/' />
      </Route>
    </div>
  );
}
