import React from "react";
import "./nav.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const Nav = () => {
  const { user } = useAuthContext();
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
            <Link to="/catalog">Снимки</Link>
          </li>
          <li>
            <Link to="/users">Потребители</Link>
          </li>
          <li>
            <Link to="/contacts">Контакти</Link>
          </li>
          {user.email ? (
            <>
              <li className="logout__btn">
                <Link to="/logout">Изход</Link>
              </li>
              <li >
                <Link to="/profile">Профил</Link>
              </li>
            </>
          ) : (
            <>
              <li className="reg__btn">
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
