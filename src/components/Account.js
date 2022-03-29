import { useEffect, useState } from "react";
import axios from "axios";

export default function Account(props) {
  const [account, setAccount] = useState({});
  useEffect(() => {
    axios
      .get("http://dct-user-auth.herokuapp.com/users/account", {
        headers: {
          "x-auth": localStorage.getItem('token'),
        },
      })
      .then((response) => {
        const result = response.data;
        setAccount(result);
        console.log(result);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);
  return (
    <div>
      <h1>Account page</h1>
      <h4>{account.username}</h4>
      <h4>{account.email}</h4>
      <h4>{account.createdAt}</h4>
    </div>
  );
}
