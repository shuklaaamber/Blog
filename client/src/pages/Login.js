import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../userContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  const login = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "content-type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert("Wrong credentials!");
    }
  };
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <form action="" className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};
export default Login;
