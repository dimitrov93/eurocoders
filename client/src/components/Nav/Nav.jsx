import React from "react";
import "./nav.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const Nav = () => {
  const { user } = useAuthContext();
  console.log(user);
  return (
    <nav>
      <Link to={"/"}>
        <img src={logo} alt="" className="nav__logo" />
      </Link>

      <div className="nav__buttons">
        <ul>
          <li>
            <Link to={"/"}>Начало</Link>
          </li>
          <li>
            <Link to="/pictures">Снимки</Link>
          </li>
          <li>
            <Link to="/users">Потребители</Link>
          </li>
          <li>
            <Link to="/contacts">Контакти</Link>
          </li>
          {user.email ? (
            <li>
              <Link to="/logout">logout</Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/register">Регистрация</Link>
              </li>
              <li>
                <Link to="/login">Влизане</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
