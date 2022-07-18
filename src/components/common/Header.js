import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Context from "../../context";

const Header = () => {
  const { user, setUser, cometChat } = useContext(Context);

  const history = useHistory();

  const logout = async () => {
    const isLogout = window.confirm("Do you want to log out ?");
    if (isLogout) {
      await cometChat.logout();
      removeAuthedInfo();
      history.push("/login");
    }
  };

  const removeAuthedInfo = () => {
    setUser(null);
    localStorage.removeItem("auth");
  };

  const goRoute = (path) => () => {
    history.push(path);
  };

  if (!user) return <React.Fragment></React.Fragment>;

  return (
    <div className="header">
      <div className="header__left">
        <img src={user.image}  alt={user.fullname} />
        <span className="header__title">Hellu, {user.fullname}</span>
      </div>
      <div className="header__right">
        <div className="header__option" onClick={goRoute("/")}>
          Home
        </div>
        <div className="header__option" onClick={goRoute("/create-meeting")}>
          Create
        </div>
        <div className="header__option" onClick={logout}>
          Logout
        </div>
        <span className="header__main">Vidora</span>
      </div>
    </div>
  );
};

export default Header;