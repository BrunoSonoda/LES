import React from "react";
import {
  FaHome,
  FaSignInAlt,
  FaUserAlt,
  FaCircle,
  FaPowerOff,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../../store/modules/auth/actions";
import { Nav } from "./styled";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(actions.loginFailure());

    navigate("/");
  };

  return (
    <Nav>
      <Link to="/">
        <FaHome size={25} />
      </Link>

      <Link to="/register">
        <FaUserAlt size={25} />
      </Link>

      {isLoggedIn ? (
        <Link onClick={handleLogout} to="#">
          <FaPowerOff size={24} />
        </Link>
      ) : (
        <Link to="/login">
          <FaSignInAlt size={24} />
        </Link>
      )}

      {isLoggedIn && <FaCircle size={25} color="#66ff33" />}
    </Nav>
  );
}
