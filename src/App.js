import "./App.css";
import NavBar from "./components/NavBar";
import {useEffect, useState} from 'react'


function App(props) {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

 const toggleHandler=(status)=>{ 
  setUserLoggedIn(status)
 // setUserLoggedIn(!userLoggedIn)
 }
 
 //To avoid the page component when refreshed
 useEffect(()=>{
   if(localStorage.getItem('token')){
     toggleHandler(true);
   }
 },[])
  return (
    <div>
      <h1>User Auth</h1>
      <NavBar userLoggedInStatus={userLoggedIn} toggle={toggleHandler} />
    </div>
  );
}

export default App;
