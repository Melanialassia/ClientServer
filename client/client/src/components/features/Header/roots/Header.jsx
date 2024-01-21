//Hooks
import { useLocation, Link } from "react-router-dom";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
//Librarys
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button } from "antd";
//Components
import NavBar from "../components/NavBar";
import ProfileMenu from "../components/ProfileMenu";
import { OPEN_MODAL } from "../../../../redux/actions-types/actions-types";
//style-sheets
import styles from "./Header.module.css";
//JavaScript

const Header = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dataUser);
  const logedUser = useSelector((state) => state.logedUser);

  const location = useLocation();
  // let userAccess = null;
  // if (data) {
  //   userAccess = data.access;
  // }

  // const userAccess = data ? data.access || localStorage.getItem("email") : false;
  const userAccess = data?.access || localStorage.getItem("email");

  const styledButton = {
    backgroundColor: "#30445c",
    borderRadius: "20px",
    color: "#e2dcd1",
    marginTop: "-5px",
    textAlign: "center",
    fontWeight: "500",
    fontSize: "20px",
    padding: "20px 20px",
    lineHeight: "-0px",
  };

  const handleCartClick = () => {
    if (logedUser === false) {
      handleOpenModal();
    } else {
      window.location.href = "/cart";
    }
  };

  const handleOpenModal = () => {
    dispatch({ type: OPEN_MODAL });
  };

  return (
    <div className={styles.headerContainer}>
      <div>
        <a href="/">
          <img
            className={styles.logo}
            src="/assets/images/LogoOla.png"
            alt="Logo"
          />
        </a>
      </div>

      <div className={styles.navbar}>
        <NavBar />
      </div>

      {userAccess !== null && userAccess !== undefined ? (
        <ProfileMenu />
      ) : (
        <ul className={styles.menuitems}>
          <li>
            <Link to="/login">
              <a href="">Iniciar sesión</a>
            </Link>
          </li>
          <Link to={"/account/create"}>
            <Button type="primary" style={styledButton}>
              Registrarse
            </Button>
          </Link>
        </ul>
      )}
      {/* {!userAccess ? (
        <div>
          <ul className={styles.menuitems}>
            <li>
              <Link to="/login">
                <a href="">Iniciar sesión</a>
              </Link>
            </li>

            <Link to={"/account/create"}>
              <Button type="primary" style={styledButton}>
                Registrarse
              </Button>
            </Link>
          </ul>
        </div>
      ) : (
        <ProfileMenu />
      )} */}

      <div>
        <ShoppingCartOutlined
          onClick={handleCartClick}
          style={{
            color: "#28445c",
            fontSize: "35px",
          }}
        />
      </div>
    </div>
  );
};

export default Header;
