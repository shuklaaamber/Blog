import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:4000/register', {
        method: "POST",
        body: JSON.stringify({username, password}),
        headers: {"content-type": "application/json"}
    })
  }
  return (
    <form action="" className="register" onSubmit={register}>
      <h1>Register</h1>
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
      <button>Register</button>
    </form>
  );
};
export default Register;
