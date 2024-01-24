//HOOKS
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
//ACTIONS
import { logOut } from "../../../../redux/actions/action";
//LIBRARY
import { Menu } from "antd";
//STYLE-SHEETS
import styles from './ProfileMenuAdmin.module.css';

function getItem(label, key, children, type) {
    return {
      key,
      children,
      label,
      type,
    };
  };
  
  const items = [
      getItem("MI PERFIL", "sub1", [
      getItem("Mi cuenta", "1"),
      getItem("Dashboard", "2"),
      getItem("Cerrar sesión", "3")
    ]),
  ];

const ProfileMenuAdmin = () => {

    const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('access');
    localStorage.setItem('logedUser', JSON.stringify(false));
    dispatch(logOut());
    navigate('/login');
  }

  const handleMenuClick = (event) => {
    switch (event.key) {
      case "1":
        navigate("/my-account");
        break;
      case "2":
        navigate("/admin-dashboard");
        break;
      case "3":
        handleLogOut();
        break;
      default:
        break;
    }
  };
  return (
    <div >
    <Menu
      className={styles['ant-menu']}
      style={{
        width: 180,
        height: 50,
        marginTop: "0px",
        marginRight: "80px",
        borderRadius: "20px"
      }}
      selectedKeys={[]} 
      defaultOpenKeys={["sub1"]}
      items={items}
      onSelect={handleMenuClick}
    />
  </div>
  );
};

export default ProfileMenuAdmin;