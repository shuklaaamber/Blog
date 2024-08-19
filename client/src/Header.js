import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./userContext";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((info) => {
        setUserInfo(info);
      });
    });
  }, []);

  console.log(userInfo);

  const logout = () => {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  };
  if (userInfo?.username) {
    return (
      <header>
        <Link to="/" className="logo">
          My Blog
        </Link>
        <nav>
          <Link to="/create">Create new post</Link>
          <Link to="/" onClick={logout}>
            Logout
          </Link>
        </nav>
      </header>
    );
  } else {
    return (
      <header>
        <Link to="/" className="logo">
          My Blog
        </Link>
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>
    );
  }
};

export default Header;
